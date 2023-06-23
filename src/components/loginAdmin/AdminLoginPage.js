import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/add-user', { email, nome });

      if (response.status === 201) {
        // Show a message that the user was created successfully
        setEmail('');
        setNome('');
        setError('User created successfully');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const checkAdminAccess = async () => {
    try {
      const response = await axios.get('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/check-admin');

      if (response.status === 200) {
        // Admin has access, proceed to the admin dashboard or other admin routes
        // Replace the next line with the appropriate redirect or navigation logic
        window.location.href = '/admin-dashboard';
      }
    } catch (error) {
      // Admin does not have access, handle the error or redirect to a non-admin page
      // Replace the next line with the appropriate redirect or navigation logic
      window.location.href = '/login';
    }
  };

  // Call the checkAdminAccess function when the component mounts
  useEffect(() => {
    checkAdminAccess();
  }, []);

  return (
    <div>
      {/* <div className="logo-container">
        <img src={logo} className="logo" alt="Logo"/>
      </div>
      <div className="login-container"> */}
        <h2>Login Admin</h2>
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
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <button type="submit">Register</button>
        </form>

        {error && <div className="error">{error}</div>}
      </div>

  );
}

export default AdminLoginPage;
