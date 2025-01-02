import React, { useState } from 'react';
import '../login/LoginPage.css';
import { SignUpService } from '../../service/auth.service';
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await SignUpService.register({ email, password }).then(
        (res) => res.data
      );

      navigate('/auth/login');

      // Redirect to login page or another action
    } catch (error) {
      console.error('Sign Up error:', error);
      alert('Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="google-logo"
        />
        <h1 className="login-title">Create your account</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
        </div>
        <div className="next-section">
          <button onClick={handleSignUp} className="next-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
