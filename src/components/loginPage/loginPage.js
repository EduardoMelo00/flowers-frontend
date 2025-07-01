import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from './logo.png';  // make sure the path to the logo is correct

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [debugInfo, setDebugInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Add class when component is mounted
    document.body.classList.add('login-page');

    // Debug removido para produção

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

  // const addDebugInfo = (message) => {
  //   const timestamp = new Date().toLocaleTimeString();
  //   setDebugInfo(prev => [...prev, `${timestamp}: ${message}`]);
  //   console.log(message);
  // };

  // Funções de debug removidas para produção

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, 
        { email, password },
        { withCredentials: true }
      );

      if (response.data.firstLogin) {
        window.location.href = '/change-password';
      }

      if (response.status === 200) {
        localStorage.setItem('flowersEmail', email);
        navigate('/welcome');
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
          <button type="submit">
            Login
          </button>
        </form>

        {error && <div className="error" style={{color: 'red', marginTop: '10px', padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '4px'}}>{error}</div>}

        <div className="help">
          <a href="/forgot-password">Esqueceu a Senha ?</a>
        </div>
        <div className="help">
          <a href="https://wa.me/48996531749">Precisa de Ajuda ?</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;



