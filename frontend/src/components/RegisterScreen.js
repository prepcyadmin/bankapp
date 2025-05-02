import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    account_number: '',
    name: '',
    phone: '',
    login_password: '',
    pin: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/register', formData);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate('/'); // Redirect to login
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Create Your Bank Account</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="account_number"
            placeholder="Account Number"
            value={formData.account_number}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="login_password"
            placeholder="Password"
            value={formData.login_password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="pin"
            placeholder="PIN"
            value={formData.pin}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'radial-gradient(circle farthest-corner at 10% 20%, rgba(253,115,200,1) 0%, rgba(0,92,141,1) 90.5%)',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    width: '400px',
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px 15px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  button: {
    marginTop: '10px',
    padding: '12px',
    backgroundColor: '#00c896',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  message: {
    marginBottom: '15px',
    color: '#ffe',
    fontSize: '14px',
  },
};

export default RegisterScreen;
