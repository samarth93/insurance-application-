import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState([]); // Array for multiple errors
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors([]);
    setLoading(true);

    try {
      if (!name || !email || !mobile || !password) {
        throw new Error('Please fill in all fields');
      }

      if (!agreeTerms) {
        throw new Error('Please agree to the Terms of Service and Privacy Policy');
      }

      // Create user data object
      const userData = {
        name,
        email,
        mobile,
        password
      };

      // Register user
      await AuthService.register(userData);

      // Redirect to dashboard
      history.push('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      
      // Handle different error formats
      if (err.errors && Array.isArray(err.errors)) {
        // Server returned an array of errors
        setErrors(err.errors);
      } else if (err.response && err.response.data && err.response.data.errors) {
        // Server returned validation errors
        setErrors(err.response.data.errors);
      } else if (err.response && err.response.data && err.response.data.message) {
        // Server returned a single error message
        setError(err.response.data.message);
      } else {
        // Fallback to any available message
        setError(err.message || 'Failed to register. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-form-box">
          <h2>Create an Account</h2>
          <p className="auth-subtitle">Join Insuretech Insurance to get started</p>

          {error && <div className="auth-error">{error}</div>}
          
          {/* Display multiple errors if available */}
          {errors.length > 0 && (
            <div className="auth-error">
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

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
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your mobile number"
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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="auth-button" disabled={loading || !agreeTerms}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login" className="auth-link">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 