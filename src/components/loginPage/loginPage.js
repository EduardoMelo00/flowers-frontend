import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from './logo.png';  // make sure the path to the logo is correct

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Add class when component is mounted
    document.body.classList.add('login-page');

    // Remove class when component is unmounted
    return () => {
      document.body.classList.remove('login-page');
    };

  }, []); 

  useEffect(() => {
    // Add class when component is mounted
    document.body.classList.add('h2Login');

    // Remove class when component is unmounted
    return () => {
      document.body.classList.remove('h2Login');
    };

  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('=== DEBUG FRONTEND LOGIN ===');
    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
    console.log('Email:', email);
    console.log('Enviando login...');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, 
        { email, password },
        { withCredentials: true } // ⭐ CRUCIAL: Enviar cookies/sessões
      );

      console.log('✅ Login response:', response.status);
      console.log('Response data:', response.data);

      if (response.data.firstLogin) {
        // Redirect to change password page
        window.location.href = '/change-password';
      }

      if (response.status === 200) {
        localStorage.setItem('flowersEmail', email);
        navigate('/welcome');
      }
    } catch (error) {
      console.log('❌ Login error:', error);
      console.log('Error response:', error.response);
      console.log('Error message:', error.message);
      
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
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
          <a href="/forgot-password">Esqueceu a Senha ?</a>
        </div>
        <div className="help">
          <a href="https://wa.me/48984863659">Precisa de Ajuda ?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;



