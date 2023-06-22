import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login");
  }

  return (
    <div style={{textAlign: 'center', color: 'white'}}>
      <h1>Sucesso!</h1>
      <p>Nova senha cadastrada com sucesso.</p>
      <button onClick={handleButtonClick}>Volte para a tela inicial e faça o login</button>
    </div>
  );
}

export default SuccessPage;
