import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing the stylesheet
import { Logo2 } from "../../assets"; // Importing the logo image
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/slices/authSlice";
import { onLogin } from "../../../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const values = { email, password };
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
      navigate("/homepage"); // Navigate to the homepage after successful login
    } catch (err) {
      console.error(
        "Error during login:",
        err.response?.data?.errors[0]?.msg || err.message
      );
      setError(err.response?.data?.errors[0]?.msg || "Internal Server Error");
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

// import { useState } from "react";
// import { onLogin } from "../../../api/auth";
// import { useDispatch } from "react-redux";
// import { authenticateUser } from "../../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState(false);

//   const onChange = (e) => {
//     console.log("onChange called");
//     setValues({ ...values, [e.target.name]: e.target.value });
//     console.log("Current values:", values);
//   };

//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // Added if navigate is needed later

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     console.log("onSubmit called with values:", values);
//     try {
//       await onLogin(values);
//       dispatch(authenticateUser());

//       localStorage.setItem("isAuth", "true");
//       navigate("/homepage"); // Navigate to homepage after successful login
//     } catch (error) {
//       console.log("Login error:", error.response?.data?.errors[0]?.msg);
//       setError(error.response?.data?.errors[0]?.msg);
//     }
//   };

//   return (
//     <form onSubmit={onSubmit} className="container mt-3">
//       <h1>Login</h1>

//       <div className="mb-3">
//         <label htmlFor="email" className="form-label">
//           Email address
//         </label>
//         <input
//           onChange={onChange}
//           type="email"
//           className="form-control"
//           id="email"
//           name="email"
//           value={values.email}
//           placeholder="test@gmail.com"
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="password" className="form-label">
//           Password
//         </label>
//         <input
//           onChange={onChange}
//           type="password"
//           value={values.password}
//           className="form-control"
//           id="password"
//           name="password"
//           placeholder="password"
//           required
//         />
//       </div>

//       <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Login;
