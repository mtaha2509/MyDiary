import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Importing the stylesheet
import { Logo2 } from "../../assets"; // Importing the logo image
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/authSlice";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  const dispatch = useDispatch();
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = {
        first_name: firstName,
        last_name: lastName,
        username,
        password,
      };
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log("Response status:", response.status); // Add this line to check response status

      if (response.ok) {
        dispatch(authenticateUser());
      } else {
        alert("Error");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("Internal Server Error");
    }
  }

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
              onChange={handleFirstNameChange}
              className="signup-input"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              className="signup-input"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
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
