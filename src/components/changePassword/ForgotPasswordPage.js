import React, { useState } from 'react';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/forgot-password', { email });

      if (response.status === 200) {
        setMessage('Um link para resetar a senha foi enviado para o seu e-mail');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Unable to connect to the server. Please try again later.');
      }
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    maxWidth: '300px',
    margin: '10px auto'
  };

  const responsiveDivStyle = {
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={responsiveDivStyle}>
      <h2>Esqueci a senha</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={inputStyle} htmlFor="email">
            Email
            <input
              style={inputStyle}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </label>
        </div>
        <button type="submit" style={inputStyle}>Confirmar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPasswordPage;
