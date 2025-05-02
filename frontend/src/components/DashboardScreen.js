import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate(''); // Redirect to login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {user ? (
          <>
            <h2 style={styles.heading}>Welcome, {user.name}</h2>

            <div style={styles.cardContainer}>
              <div style={styles.card} onClick={() => navigate('/deposit')}>
                <h3>💰 Deposit</h3>
                <p>Add funds to your account</p>
              </div>
              <div style={styles.card} onClick={() => navigate('/withdraw')}>
                <h3>💸 Withdraw</h3>
                <p>Withdraw funds from your account</p>
              </div>
              <div style={styles.card} onClick={() => navigate('/balance')}>
                <h3>📊 Balance</h3>
                <p>View your current balance</p>
              </div>
            </div>

            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <p style={styles.error}>{error}</p>
        )}
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
    backdropFilter: 'blur(15px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center',
    width: '90%',
    maxWidth: '800px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    color: '#fff',
  },
  heading: {
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '600',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    padding: '20px',
    width: '200px',
    color: '#fff',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '30px',
    padding: '10px 30px',
    backgroundColor: '#e74c3c',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

// Hover effect (optional via CSS class or inline JS style tweak on :hover is not possible directly)
styles.card[':hover'] = {
  transform: 'scale(1.05)',
};

export default DashboardScreen;
