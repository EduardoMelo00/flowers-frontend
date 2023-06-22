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
        setMessage('Password reset link sent to your email.');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
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
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPasswordPage;
