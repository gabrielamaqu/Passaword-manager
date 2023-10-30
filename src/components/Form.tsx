// Form.tsx
import React, { useState } from 'react';

interface Service {
  id: number;
  name: string;
  login: string;
  senha: string;
  url: string;
}

interface FormProps {
  onCancel: () => void;
  onAddService: (dadosDoFormulario: Service) => void;
}

function Form({ onCancel, onAddService }: FormProps) {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [url, setUrl] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [habilitarCadastrar, setHabilitarCadastrar] = useState(false);
  const [esconderSenhas, setEsconderSenhas] = useState(false);
  const [servicos, setServicos] = useState<Service[]>([]);

  const validarCampos = (nomeParam: string, loginParam: string, senhaParam: string) => {
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senhaParam);
    const temLetrasENumeros = /[a-zA-Z]/.test(senhaParam) && /\d/.test(senhaParam);
    const senhaValida = (
      senhaParam.length >= 8
      && senhaParam.length <= 16
      && temCaractereEspecial
      && temLetrasENumeros
    );
    const habilitaCadastro = (
      nomeParam !== ''
      && loginParam !== ''
      && senhaParam !== ''
      && senhaValida
    );
    setHabilitarCadastrar(habilitaCadastro);
  };

  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoNome = event.target.value;
    setNome(novoNome);
    validarCampos(novoNome, login, senha);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoLogin = event.target.value;
    setLogin(novoLogin);
    validarCampos(nome, novoLogin, senha);
  };

  const handleSenhaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaSenha = event.target.value;
    setSenha(novaSenha);
    validarCampos(nome, login, novaSenha);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novaUrl = event.target.value;
    setUrl(novaUrl);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const dadosDoFormulario: Service = {
      id: servicos.length + 1,
      name: nome,
      login,
      senha,
      url,
    };

    // Adiciona o novo serviço usando a propriedade onAddService
    onAddService(dadosDoFormulario);

    // Resetar o formulário
    setNome('');
    setLogin('');
    setSenha('');
    setUrl('');

    // Esconder o formulário
    setMostrarFormulario(false);
  };

  const getPasswordValidationClass = (isValid: boolean) => {
    return isValid ? 'valid-password-check' : 'invalid-password-check';
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="nome">Nome do serviço</label>
      <input id="nome" type="text" name="nome" onChange={ handleNomeChange } />

      <label htmlFor="login">Login</label>
      <input id="login" type="text" value={ login } onChange={ handleLoginChange } />

      <label htmlFor="password">Senha</label>
      <input id="password" type="password" onChange={ handleSenhaChange } />
      <label htmlFor="url">URL</label>
      <input id="url" type="text" name="url" value={ url } onChange={ handleUrlChange } />
      <div className={ getPasswordValidationClass(senha.length >= 8) }>
        Possuir 8 ou mais caracteres
      </div>
      <div className={ getPasswordValidationClass(senha.length <= 16) }>
        Possuir até 16 caracteres
      </div>
      <div className={ getPasswordValidationClass(/[a-zA-Z]/.test(senha) && /\d/.test(senha)) }>
        Possuir letras e números
      </div>
      <div className={ getPasswordValidationClass(/[!@#$%^&*(),.?":{}|<>]/.test(senha)) }>
        Possuir algum caractere especial
      </div>

      <button
        data-testid="cadastrar-b"
        type="submit"
        disabled={ !habilitarCadastrar }
      >
        Cadastrar
      </button>

      <button data-testid="cancelar-button" type="button" onClick={ onCancel }>
        Cancelar
      </button>
    </form>
  );
}

export default Form;
