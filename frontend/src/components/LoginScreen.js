import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginScreen = ({ onLoginSuccess }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('/login', {
        account_number: accountNumber,
        login_password: password,
      });

      if (response.data && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        onLoginSuccess(response.data.user.account_number);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials. Not registered? Please register.');
      } else {
        setError('Server error. Try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.heading}>Login</h2>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={styles.error}>{error}</p>}
        <button onClick={goToRegister} style={styles.link}>
          New user? Register here
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: ' linear-gradient( 89.5deg,  rgba(104,208,232,1) 1.5%, rgba(231,144,245,1) 100.5% )',
    fontFamily: 'Poppins, sans-serif',
  },
  
  form: {
    backdropFilter: 'blur(15px)',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '320px',
    gap: '20px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  heading: {
    color: '#fff',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
  error: {
    color: '#ff4d4d',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

export default LoginScreen;
