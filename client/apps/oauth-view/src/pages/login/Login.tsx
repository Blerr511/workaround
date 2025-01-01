import React from 'react';
import './LoginPage.css';
import { Logo } from '../../assets';

export const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <Logo height={100} className="google-logo" />
        <h1 className="login-title">Sign in</h1>
        <p className="login-subtitle">to continue to WR</p>
        <form className="login-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email or phone"
              className="login-input"
              required
            />
          </div>
          <p className="form-helper">
            Not your computer? Use Guest mode to sign in privately.{' '}
            <a href="/">Learn more</a>
          </p>
          <div className="form-actions">
            <a href="/" className="forgot-email">
              Forgot email?
            </a>
          </div>
          <div className="next-section">
            <button type="submit" className="next-button">
              Next
            </button>
          </div>
        </form>
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
