import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import API_URL from "../config";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);
    setError('');

    try {
      
        const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === 'Login Success') {
        // Store JWT token and user info
        localStorage.setItem('adminAuth', 'true');
        localStorage.setItem('adminUserName', data.userName);
        localStorage.setItem('token', data.token);
        
        if (onLogin) {
          onLogin(true);
        }
        
        navigate('/admin');
      } else {
        // Show specific error messages based on response
        if (data.message === 'Invalid Username' || data.message === 'User not found') {
          setError('❌ User does not exist. Please check your username.');
        } else if (data.message === 'Password mismatch' || data.message === 'Invalid password') {
          setError('❌ Password is incorrect. Please try again.');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Cannot connect to server. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <i className="fas fa-shield-alt"></i>
          <h2>Admin Login</h2>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Authenticating...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Sign in
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Enter your credentials to access admin dashboard</p>
          <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
            Demo: Use registered username and password
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;