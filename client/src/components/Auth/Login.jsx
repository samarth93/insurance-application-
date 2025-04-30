import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields.');
      }

      await AuthService.login(email, password);
      history.push('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to login as a test user
  const loginAsTestUser = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setEmail('palsamarth9@gmail.com');
    
    try {
      await AuthService.login('palsamarth9@gmail.com', 'password123');
      history.push('/dashboard');
    } catch (err) {
      console.error('Test login failed:', err);
      setError(err.message || 'Failed to login as test user. Try the regular login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form-box">
          <h2>Login to Your Account</h2>
          <p className="auth-subtitle">Welcome back! Please enter your details.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group form-actions">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <button 
              onClick={loginAsTestUser} 
              className="auth-button secondary-button"
              style={{ marginTop: '10px', backgroundColor: '#f0f0f0', color: '#333' }}
              disabled={loading}
            >
              Login as Samarth (Demo)
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 