import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');



  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`, { password, email });

      if (response.status === 200) {
        history('/success');
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
      <h2>Resetar senha</h2>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label style={inputStyle} htmlFor="password">
            Nova senha
            <input
              style={inputStyle}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label style={inputStyle} htmlFor="confirmPassword">
            Confirmar nova senha
            <input
              style={inputStyle}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" style={inputStyle}>Resetar senha</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPasswordPage;
