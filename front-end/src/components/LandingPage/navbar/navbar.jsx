import React, { useState } from "react";
import { dropdown, logo1 } from "../../../assets";
import "./navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { onLogout } from "../../../../api/auth";
import { unauthenticateUser } from "../../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const nav = useNavigate();
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    nav("/login");
  };

  const handleAboutClick = () => {
    nav("/about");
  };

  const handleLogoutClick = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleHomeClick = () => {
    nav("/homepage");
  };

  return (
    <div className="about-nav">
      <nav className="navbar">
        <div className="logo">
          <img src={logo1} alt="Logo" />
        </div>
        <div className={`Navbar-Options ${isMenuOpen ? "open" : ""}`}>
          <ul className="navbar-menu">
            <li>
              <a href="/about" onClick={handleAboutClick}>
                About
              </a>
            </li>
            <li>
              Resources <img src={dropdown} alt="Dropdown" />
            </li>
            <li>
              Company <img src={dropdown} alt="Dropdown" />
            </li>
            <li>
              Prices <img src={dropdown} alt="Dropdown" />
            </li>
          </ul>
          <div className="navbar-buttons">
            {!authState.isAuth && (
              <>
                <a
                  href="/login"
                  className="navbar-login"
                  onClick={handleLoginClick}
                >
                  Login
                </a>
                <a href="/register" className="navbar-create-account">
                  Create free account
                </a>
              </>
            )}
            {authState.isAuth && (
              <>
                <a className="navbar-create-account" onClick={handleHomeClick}>
                  Homepage
                </a>
                <a
                  className="navbar-create-account"
                  onClick={handleLogoutClick}
                >
                  Logout
                </a>
              </>
            )}
          </div>
          <button className="navbar-toggle-menu" onClick={toggleMenu}>
            Toggle
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
