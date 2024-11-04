import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; 

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, password };

    console.log(newUser);

    try {
      const response = await fetch('http://localhost:8000/api/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        alert("Account created successfully!");
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create an account.');
    }
};


  return (
    <div className="signup-page">
      <div className="left-section">
        <img className='logo' src="./inv_logo.svg" alt="Inventory" />
      </div>
      <div className="right-section">
        <div className="signup-box">
          <div className="welcome-section">
            <h1>Create an Account</h1>
          </div>

          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter an Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
  <label>Password</label>
  <div className="password-wrapper">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Enter your Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <FontAwesomeIcon
      icon={showPassword ? faEyeSlash : faEye}
      className="toggle-password"
      onClick={() => setShowPassword(!showPassword)}
    />
  </div>
</div>

            <button type="submit" className="signup-btn">Create Account</button>

            <span className="login-link" onClick={() => navigate('/login')}>
              Already have an account? Login here
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;