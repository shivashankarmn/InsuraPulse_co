import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const Register = () => {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(userData);
    navigate('/login');
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">Register</button>
        </form>

        <div className="d-flex justify-content-between">
          <a href="/login" className="text-decoration-none">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
