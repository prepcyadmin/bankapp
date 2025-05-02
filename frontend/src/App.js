import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import DashboardScreen from './components/DashboardScreen';
import DepositScreen from './components/DepositScreen';
import WithdrawScreen from './components/WithdrawScreen';
import BalanceScreen from './components/BalanceScreen'; // ✅ Import

const App = () => {
  const [accountNumber, setAccountNumber] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.account_number) {
      setAccountNumber(storedUser.account_number);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            accountNumber ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginScreen onLoginSuccess={setAccountNumber} />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterScreen onRegisterSuccess={setAccountNumber} />}
        />
        <Route
          path="/dashboard"
          element={
            accountNumber ? (
              <DashboardScreen accountNumber={accountNumber} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/deposit"
          element={
            accountNumber ? (
              <DepositScreen accountNumber={accountNumber} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/withdraw"
          element={
            accountNumber ? (
              <WithdrawScreen accountNumber={accountNumber} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/balance"
          element={
            accountNumber ? (
              <BalanceScreen accountNumber={accountNumber} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
      </Routes>
      
    </Router>
    
  );
};

export default App;
