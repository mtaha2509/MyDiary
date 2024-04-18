import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './signup.css'; // Importing the stylesheet

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleConfirmPasswordChange(event) {
    setConfirmPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Here you can perform validation and user registration logic
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // Successful registration logic
      setError("");
      alert("Registration successful!");
    }
  }

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="signup-label">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          className="signup-input"
          required
        />
        <label htmlFor="password" className="signup-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="signup-input"
          required
        />
        <label htmlFor="confirmPassword" className="signup-label">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="signup-input"
          required
        />
        {error && <p className="signup-error-message">{error}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
        <p className="signup-login-link">Already have an account? <a onClick={()=> navigate('/login')} className="signup-login-link-anchor">Log In</a></p>
      </form>
    </div>
  );
}

export default SignUp;
