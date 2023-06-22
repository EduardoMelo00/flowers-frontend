import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('The new password and its confirmation do not match.');
      return;
    }

    try {
      const response = await axios.post('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/change-password', {
        email,
        newPassword,
        confirmPassword,
      });

      navigate('/success');
    } catch (err) {
      setMessage('Failed to change password. Please try again.', err.message);
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
      <h1>Alteração de senha</h1>
      <form onSubmit={handleSubmit}>
        <label style={inputStyle}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            required
            style={inputStyle}
          />
        </label>
        <label style={inputStyle}>
          Nova senha:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label style={inputStyle}>
          Confirme a nova senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={inputStyle}>Alterar senha</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;
