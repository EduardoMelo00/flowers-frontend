import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');

  const history = useNavigate(); // Define history here

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('https://flowers-node-backend-2c4af429ac26.herokuapp.com/api/auth/reset-password', { password, token });

      if (response.status === 200) {
        history.push('/success'); // Replace navigate with history.push
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
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPasswordPage;
