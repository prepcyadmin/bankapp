import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const BalanceScreen = ({ accountNumber }) => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`/balance/${accountNumber}`);
        setBalance(Number(response.data.balance));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch balance');
      }
    };

    fetchBalance();
  }, [accountNumber]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Current Balance</h2>
        {balance !== null && !isNaN(balance) ? (
          <p style={styles.balance}>₹ {balance.toFixed(2)}</p>
        ) : (
          <p style={styles.error}>{error || 'Invalid balance'}</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'linear-gradient(to top left, #fbc2eb 0%, #a6c1ee 100%)',
    fontFamily: 'Poppins, sans-serif',
  },
  container: {
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  balance: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#00ffb3',
  },
  error: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
};

export default BalanceScreen;
