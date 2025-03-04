import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(username);
      alert('Temp@123 is your temporary password');
      navigate('/login');
    } catch (error) {
      setError('Error resetting password. Please try again.');
      console.error('Error resetting password', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Forgot Password</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Reset Password</button>
        </form>

        <div className="d-flex justify-content-between">
          <a href="/login" className="text-decoration-none">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;