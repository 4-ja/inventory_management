import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css'; 

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        <img src="path_to_image" alt="Inventory" />
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
              <input
                type="password"
                placeholder="Enter a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
