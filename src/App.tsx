import React, { useState } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';

type OnRemoveService = (id: number) => void;

interface Service {
  id: number;
  name: string;
  login: string;
  senha: string;
  url: string;
}

function App() {
  const [mostrarBotao, setMostrarBotao] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [servicos, setServicos] = useState<Service[]>([]);
  const [esconderSenhas, setEsconderSenhas] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const mostrarFormularioHandler = () => {
    setMostrarBotao(false);
    setMostrarFormulario(true);
  };

  const cancelarFormularioHandler = () => {
    setMostrarBotao(true);
    setMostrarFormulario(false);
  };

  const removerFormularioHandler: OnRemoveService = (id) => {
    const novosServicos = servicos.filter((service) => service.id !== id);
    setServicos(novosServicos);
  };

  const adicionarServico = (novoServico: Service) => {
    setServicos((prevServicos) => [
      ...prevServicos,
      { ...novoServico, id: prevServicos.length + 1 },
    ]);
    cancelarFormularioHandler();
  };

  return (
    <div>
      <Title />
      {mostrarFormulario && (
        <Form
          onCancel={ cancelarFormularioHandler }
          onAddService={ adicionarServico }
        />
      )}
      {mostrarBotao && (
        <button
          type="submit"
          onClick={ mostrarFormularioHandler }
        >
          Cadastrar nova senha
        </button>
      )}

      {servicos.length === 0 ? (
        <p>Nenhuma senha cadastrada</p>
      ) : (
        servicos.map((service) => (
          <div key={ service.id }>
            <a href={ service.url } target="_blank" rel="noopener noreferrer">
              {service.name}
            </a>
            <p>
              Login:
              { service.login }
            </p>
            <p>
              Senha:
              <span className={ esconderSenhas ? 'senha-escondida' : '' }>
                {service.senha}
              </span>
            </p>
            {/* Botão para remover o serviço */}
            <button
              data-testid="remove-btn"
              onClick={ () => removerFormularioHandler(service.id) }
            >
              Remover
            </button>
          </div>
        ))
      )}
    </div>
  );
}
export default App;
