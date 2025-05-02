import React, { useState } from 'react';
import axios from '../services/api';

const WithdrawScreen = ({ accountNumber }) => {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [category, setCategory] = useState('Food');
  const [message, setMessage] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post('/withdraw', {
        account_number: accountNumber,
        pin,
        amount: parseFloat(amount),
        category,
      });

      if (response.data.message === 'Withdrawal successful') {
        setMessage('✅ Withdrawal successful');
        setAmount('');
        setPin('');
        setCategory('Food');
      } else {
        setMessage('⚠️ Withdrawal failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || '⚠️ Something went wrong');
    }
  };

  const categories = ['Food', 'Grocery', 'Shopping', 'Entertainment', 'Bills', 'Other'];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Withdraw Funds</h2>
        <form onSubmit={handleWithdraw} style={styles.form}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.radioGroup}>
            {categories.map((cat) => (
              <label key={cat} style={category === cat ? styles.radioSelected : styles.radioLabel}>
                <input
                  type="radio"
                  value={cat}
                  checked={category === cat}
                  onChange={() => setCategory(cat)}
                  style={styles.radioInput}
                />
                <span style={styles.radioText}>{cat}</span>
              </label>
            ))}
          </div>

          <button type="submit" style={styles.button}>Withdraw</button>
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
    backgroundImage: 'radial-gradient(circle at top left, #ff9a9e, #fad0c4, #a18cd1, #fbc2eb)',
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
  radioGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'space-between',
  },
  radioLabel: {
    flex: '1 1 45%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  radioSelected: {
    flex: '1 1 45%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '10px',
    border: '1px solid #fff',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
  radioInput: {
    marginRight: '10px',
    transform: 'scale(1.2)',
  },
  radioText: {
    fontWeight: '600',
  },
  button: {
    padding: '12px',
    background: '#ff6f61',
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

export default WithdrawScreen;
