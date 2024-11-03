import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
  
    try {
      const response = await fetch('http://localhost:8000/api/loginUser', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
    
        localStorage.setItem('userName', data.user.name);
    
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to login.');
    }
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
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            <span className="forgot-password" onClick={() => navigate('/')}>
              Create Account
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
