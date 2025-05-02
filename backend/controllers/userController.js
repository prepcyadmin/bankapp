const bcrypt = require('bcrypt');
const db = require('../config/db');
const saltRounds = 10;

// Register User
exports.registerUser = (req, res) => {
  const { account_number, name, phone, login_password, pin } = req.body;

  console.log("📥 Register request received:", req.body);

  // Validation
  if (!account_number || !name || !phone || !login_password || !pin) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password
  bcrypt.hash(login_password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password', error: err });
    }

    const query = `INSERT INTO users (account_number, name, phone, login_password, pin) VALUES (?, ?, ?, ?, ?)`;

    db.query(query, [account_number, name, phone, hashedPassword, pin], (err) => {
      if (err) {
        console.error("❌ Registration error:", err);
        return res.status(400).json({ message: 'Registration failed', error: err });
      }

      res.status(200).json({ message: 'User registered successfully' });
    });
  });
};

// Login User
exports.loginUser = (req, res) => {
  const { account_number, login_password } = req.body;

  if (!account_number || !login_password) {
    return res.status(400).json({ message: 'Account number and password are required' });
  }

  const query = `SELECT * FROM users WHERE account_number = ?`;
  db.query(query, [account_number], (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(login_password, user.login_password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.status(200).json({ message: 'Login successful', user });
    });
  });
};

// Deposit Money
exports.deposit = (req, res) => {
  const { account_number, amount } = req.body;

  if (!account_number || !amount || isNaN(amount)) {
    return res.status(400).json({ message: 'Invalid input for deposit' });
  }

  const query = `UPDATE users SET balance = balance + ? WHERE account_number = ?`;
  db.query(query, [amount, account_number], (err) => {
    if (err) {
      console.error("❌ Deposit Error:", err);
      return res.status(500).json({ message: 'Deposit failed', error: err });
    }

    res.status(200).json({ message: 'Deposit successful' });
  });
};

// Withdraw Money
exports.withdraw = (req, res) => {
  const { account_number, pin, amount, category } = req.body;

  if (!account_number || !pin || !amount || !category) {
    return res.status(400).json({ message: 'All fields are required for withdrawal' });
  }

  const checkQuery = `SELECT * FROM users WHERE account_number = ? AND pin = ?`;
  db.query(checkQuery, [account_number, pin], (err, results) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid PIN' });
    }

    const user = results[0];

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const updateQuery = `UPDATE users SET balance = balance - ? WHERE account_number = ?`;
    db.query(updateQuery, [amount, account_number], (err) => {
      if (err) {
        console.error("❌ Withdrawal Error:", err);
        return res.status(500).json({ message: 'Withdrawal failed', error: err });
      }

      const metaQuery = `INSERT INTO spending_metadata (user_id, category, amount_spent) VALUES (?, ?, ?)`;
      db.query(metaQuery, [user.id, category, amount], (err) => {
        if (err) {
          console.error("❌ Metadata Insert Error:", err);
          return res.status(500).json({ message: 'Metadata logging failed', error: err });
        }

        res.status(200).json({ message: 'Withdrawal successful' });
      });
    });
  });
};

// Get Balance
exports.getBalance = (req, res) => {
  const { account_number } = req.params;

  const query = `SELECT balance FROM users WHERE account_number = ?`;
  db.query(query, [account_number], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ balance: results[0].balance });
  });
};
