import React, { useState } from 'react';

interface FormProps {
  onCancel: () => void;
}
function Form({ onCancel }: FormProps) {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [habilitarCadastrar, setHabilitarCadastrar] = useState(false);

  const validarCampos = (nomeParam: string, loginParam: string, senhaParam: string) => {
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    const temLetrasENumeros = /[a-zA-Z]/.test(senha) && /\d/.test(senha);
    const senhaValida = senha.length >= 8
  && senha.length <= 16
  && temCaractereEspecial
  && temLetrasENumeros;
    const habilitaCadastro = nomeParam !== ''
  && loginParam !== ''
  && senhaParam !== ''
  && senhaValida;

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const dadosDoFormulario = {
      nome,
      login,
      senha,
    };
    try {
      const resposta = await fetch('URL_DO_SEU_ENDPOINT_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosDoFormulario),
      });
      if (resposta.ok) {
        console.log('Dados do formulário enviados com sucesso!');
      } else {
        console.error('Erro ao enviar dados do formulário ao servidor.');
      }
    } catch (erro) {
      console.error('Erro durante o envio do formulário:', erro);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="nome"> Nome do serviço </label>
      <input id="nome" type="text" name="nome" onChange={ handleNomeChange } />

      <label htmlFor="login"> Login </label>
      <input id="login" type="text" value={ login } onChange={handleLoginChange} />

      <label htmlFor="password"> Senha </label>
      <input id="password" type="password" value={ senha } onChange={handleSenhaChange} />

      <label htmlFor="url"> URL </label>
      <input id="url" type="text" name="url" />

      <button data-testid="cadastrar-button" type="submit" disabled={!habilitarCadastrar}>
        Cadastrar
      </button>
      <button data-testid="cancelar-button" type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
}
export default Form;
