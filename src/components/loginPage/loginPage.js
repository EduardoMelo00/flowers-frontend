import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from './logo.png';  // make sure the path to the logo is correct

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });

      if (response.data.firstLogin) {
        // Redirect to change password page
        window.location.href = '/change-password';
      }

      if (response.status === 200) {
        // Show a message that the link was sent to the user's email
        setEmail('');
        setPassword('');
        setError('Login link sent to your email. Please check your inbox.');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div>
      <div className="logo-container">
        <img src={logo} className="logo" alt="Logo"/>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="help">
          <a href="#">Precisa de Ajuda ?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
