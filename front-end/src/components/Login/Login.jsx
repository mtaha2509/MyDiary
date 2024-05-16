import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing the stylesheet
import { Logo2 } from "../../assets"; // Importing the logo image
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/authSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  const dispatch = useDispatch();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        dispatch(authenticateUser());
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Internal Server Error");
    }
  }

  return (
    <div className="login-container">
      <div className="left-half">
        <div className="logo-container">
          <img
            src={Logo2}
            alt="Logo"
            className="logo"
            style={{ height: "500px" }}
          />
        </div>
      </div>
      <div className="right-half">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="login-title">Login</h1>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="login-input"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
            required
          />
          {error && <p className="login-error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="login-signup-link">
            Don't have an account?{" "}
            <a href="/register" className="login-signup-link-anchor">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
