import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate(); 

  const handleCreateAccountClick = () => {
    navigate('/'); 
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src="path_to_your_image" alt="Inventory" />
      </div>

      <div className="right-section">
        <div className="login-box">
          <div className="welcome-section">
            <div className="logo">
              <img src="path_to_logo" alt="Inventory Logo" />
            </div>
            <h1>你好 👋</h1>
            <p>Please login here</p>
          </div>
          
          <form className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter an Email Address"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                required
              />
              <span className="forgot-password" onClick={handleCreateAccountClick}>
                Create Account
              </span>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
