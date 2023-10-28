import React, { useState } from 'react';
import './App.css';
import Title from './components/Title';
import Form from './components/Form';

function App() {
  const [mostrarBotao, setMostrarBotao] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const mostrarFormularioHandler = () => {
    setMostrarBotao(false);
    setMostrarFormulario(true);
  };

  const cancelarFormularioHandler = () => {
    setMostrarBotao(true);
    setMostrarFormulario(false);
  };

  return (
    <div>
      <Title />
      {mostrarFormulario && <Form onCancel={ cancelarFormularioHandler } />}
      {mostrarBotao && (
        <button onClick={ mostrarFormularioHandler }>Cadastrar nova senha</button>
      )}
    </div>
  );
}

export default App;
