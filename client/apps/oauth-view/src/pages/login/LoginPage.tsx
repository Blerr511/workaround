import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { Logo } from '../../assets';
import { AuthApi } from '@wr/auth-api';
import { AuthService } from '../../service/auth.service';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Email Input, Step 2: Password Input
  const [accounts, setAccounts] = useState([
    { email: 'user1@example.com', name: 'User One' },
    { email: 'user2@example.com', name: 'User Two' },
  ]); // Mocked accounts for display
  const [selectedAccount, setSelectedAccount] = useState<{
    email: string;
    name: string;
  } | null>(null);

  const navigate = useNavigate();



  const handleNext = async () => {
    if (step === 1) {
      try {
        // // Call API to verify email existence
        // const response = await axios.post('/api/verify-email', { email });
        // if (response.data.exists) {
        setStep(2);
        // } else {
        //   alert('Email not found. Please sign up.');
        // }
      } catch (error) {
        console.error('Error verifying email:', error);
        alert('Failed to verify email. Please try again.');
      }
    } else if (step === 2) {
      try {
        // Call API to log in
        const response = await AuthService.login({
          provider: 'email',
          username: email,
          password,
        });

        alert('Login successful! UID: ' + response.data.uid);
        // Add logic to redirect user after login
      } catch (error) {
        console.error('Login error:', error);
        alert('Invalid credentials. Please try again.');
      }
    }
  };

  const handleAccountSelect = (account: { email: string; name: string }) => {
    setSelectedAccount(account);
    setEmail(account.email);
    setStep(2);
  };

  const handleLogout = async (account: { email: string; name: string }) => {
    try {
      await axios.post('/api/logout', { email: account.email });
      alert('Logged out: ' + account.email);
      // Remove account from the list
      setAccounts(accounts.filter((a) => a.email !== account.email));
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="google-logo"
        />
        {selectedAccount ? (
          <h1 className="login-title">Welcome back</h1>
        ) : (
          <h1 className="login-title">Sign in</h1>
        )}
        <p className="login-subtitle">
          {step === 1
            ? 'to continue to [Your App Name]'
            : 'Enter your password to continue'}
        </p>
        <div className="login-body">
          {accounts.length > 0 && step === 1 && (
            <div className="account-list">
              {accounts.map((account) => (
                <div key={account.email} className="account-item">
                  <div
                    className="account-info"
                    onClick={() => handleAccountSelect(account)}
                  >
                    <div className="account-avatar">{account.name[0]}</div>
                    <div>
                      <p>{account.name}</p>
                      <p className="account-email">{account.email}</p>
                    </div>
                  </div>
                  <button
                    className="logout-button"
                    onClick={() => handleLogout(account)}
                  >
                    Logout
                  </button>
                </div>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="form-group">
              <input
                type="email"
                placeholder="Email or phone"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
              />
            </div>
          )}
          {step === 2 && (
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
            </div>
          )}
          <div className="next-section">
            <button onClick={handleNext} className="next-button">
              {step === 1 ? 'Next' : 'Login'}
            </button>
            <button onClick={handleSignUp} className="signup-button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <div className="footer-links">
          <a href="/">Help</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
      </footer>
    </div>
  );
};
