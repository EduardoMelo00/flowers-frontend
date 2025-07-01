import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';
import logo from './logo.png';  // make sure the path to the logo is correct

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Add class when component is mounted
    document.body.classList.add('login-page');

    // Debug info inicial
    const initialDebug = [
      `🌐 URL atual: ${window.location.href}`,
      `🔧 Backend URL: ${process.env.REACT_APP_BACKEND_URL}`,
      `📱 User Agent: ${navigator.userAgent.substring(0, 100)}...`,
      `🍪 Cookies disponíveis: ${document.cookie ? 'Sim' : 'Não'}`,
      `💾 LocalStorage disponível: ${localStorage ? 'Sim' : 'Não'}`,
      `📅 Timestamp: ${new Date().toISOString()}`
    ];
    
    setDebugInfo(initialDebug);

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

  const addDebugInfo = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setDebugInfo(prev => [...prev, `${timestamp}: ${message}`]);
    console.log(message);
  };

  const testConnection = async () => {
    addDebugInfo('🧪 Testando conexão com backend...');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/health`, {
        method: 'GET',
        credentials: 'include'
      });
      
      addDebugInfo(`📡 Status da conexão: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        addDebugInfo(`✅ Backend respondeu: ${JSON.stringify(data)}`);
      } else {
        addDebugInfo(`❌ Backend erro: ${response.statusText}`);
      }
    } catch (error) {
      addDebugInfo(`❌ Erro de rede: ${error.message}`);
    }
  };

  const clearDebug = () => {
    setDebugInfo([]);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Limpar debug anterior
    setDebugInfo([]);
    setError('');
    
    addDebugInfo('🔘 Botão de login clicado!');
    addDebugInfo('=== DEBUG FRONTEND LOGIN ===');
    addDebugInfo(`Backend URL: ${process.env.REACT_APP_BACKEND_URL}`);
    addDebugInfo(`Email: ${email}`);
    addDebugInfo('Enviando login...');

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, 
        { email, password },
        { withCredentials: true } // ⭐ CRUCIAL: Enviar cookies/sessões
      );

      addDebugInfo(`✅ Login response: ${response.status}`);
      addDebugInfo(`Response data: ${JSON.stringify(response.data)}`);

      if (response.data.firstLogin) {
        addDebugInfo('🔄 Redirecionando para mudança de senha...');
        // Redirect to change password page
        window.location.href = '/change-password';
      }

      if (response.status === 200) {
        addDebugInfo('💾 Salvando email no localStorage...');
        localStorage.setItem('flowersEmail', email);
        addDebugInfo('🎉 Redirecionando para welcome...');
        navigate('/welcome');
      }
    } catch (error) {
      addDebugInfo(`❌ Login error: ${error.message}`);
      addDebugInfo(`Error response: ${error.response ? JSON.stringify(error.response.data) : 'Sem response'}`);
      addDebugInfo(`Error status: ${error.response ? error.response.status : 'N/A'}`);
      
      if (error.response) {
        setError(error.response.data.error);
        addDebugInfo(`🔴 Erro definido: ${error.response.data.error}`);
      } else {
        setError('Unable to connect to the server. Please try again later.');
        addDebugInfo('🔴 Erro de conexão - servidor indisponível');
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
          <button 
            type="submit"
            onClick={(e) => {
              addDebugInfo('🖱️ Botão clicado diretamente!');
            }}
          >
            Login
          </button>
        </form>

        {error && <div className="error" style={{color: 'red', marginTop: '10px', padding: '10px', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: '4px'}}>{error}</div>}
        
                 {/* Debug Info Visível */}
         {debugInfo.length > 0 && (
           <div style={{
             marginTop: '20px',
             padding: '10px',
             backgroundColor: 'rgba(0,0,0,0.8)',
             color: '#00ff00',
             borderRadius: '4px',
             fontFamily: 'monospace',
             fontSize: '12px',
             maxHeight: '300px',
             overflowY: 'auto'
           }}>
             <div style={{color: '#ffff00', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
               <span>🔍 DEBUG INFO (F12 Bloqueado):</span>
               <div>
                 <button 
                   onClick={testConnection}
                   style={{
                     backgroundColor: '#0066cc',
                     color: 'white',
                     border: 'none',
                     padding: '2px 8px',
                     borderRadius: '3px',
                     fontSize: '10px',
                     marginRight: '5px',
                     cursor: 'pointer'
                   }}
                 >
                   🧪 Testar Conexão
                 </button>
                 <button 
                   onClick={clearDebug}
                   style={{
                     backgroundColor: '#cc6600',
                     color: 'white',
                     border: 'none',
                     padding: '2px 8px',
                     borderRadius: '3px',
                     fontSize: '10px',
                     cursor: 'pointer'
                   }}
                 >
                   🗑️ Limpar
                 </button>
               </div>
             </div>
             {debugInfo.map((info, index) => (
               <div key={index} style={{marginBottom: '2px'}}>{info}</div>
             ))}
           </div>
         )}

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



