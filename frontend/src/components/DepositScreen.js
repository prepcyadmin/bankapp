import React, { useState } from 'react';
import axios from '../services/api';

const DepositScreen = ({ accountNumber }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/deposit', {
        account_number: accountNumber,
        amount: parseFloat(amount),
      });

      if (response.data.message === 'Deposit successful') {
        setMessage('✅ Deposit successful');
        setAmount('');
      } else {
        setMessage('⚠️ Deposit failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || '⚠️ Something went wrong');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Deposit Funds</h2>
        <form onSubmit={handleDeposit} style={styles.form}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Deposit</button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
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
    backgroundImage: 'radial-gradient(circle at top left, #ffecd2, #fcb69f, #a18cd1, #fbc2eb)',
    padding: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '500px',
    padding: '30px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    background: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  message: {
    marginTop: '15px',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
};

export default DepositScreen;
