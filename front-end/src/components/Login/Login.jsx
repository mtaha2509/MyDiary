import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Importing the stylesheet

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Here you can perform validation and authentication logic
    if (username === "demo" && password === "password") {
      // Successful login logic
      setError("");
      alert("Login successful!");
    } else {
      // Failed login logic
      setError("Invalid username or password");
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="login-label">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          className="login-input"
          required
        />
        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="login-input"
          required
        />
        {error && <p className="login-error-message">{error}</p>}
        <button type="submit" className="login-button">Log In</button>
        <p className="login-signup-link">Don't have an account? <a onClick={()=> navigate('/signup')} className="login-signup-link-anchor">Sign Up</a></p>
      </form>
    </div>
  );
}

export default Login;
