import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Importing the stylesheet
import { Logo2 } from "../../assets"; // Importing the logo image
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/authSlice";
import { onRegistration } from "../../../api/auth";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      };
      await onRegistration(body);
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      let errorMessage = "Internal Server Error";
      if (err.response && err.response.data) {
        if (
          Array.isArray(err.response.data.errors) &&
          err.response.data.errors.length > 0
        ) {
          errorMessage = err.response.data.errors[0].msg;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="signup-container">
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
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1 className="signup-title">Sign Up</h1>
          <div className="name-inputs">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="signup-input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="signup-input"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            required
          />
          {error && <p className="signup-error-message">{error}</p>}
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="signup-login-link">
            Already have an account?{" "}
            <a href="/login" className="signup-login-link-anchor">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
