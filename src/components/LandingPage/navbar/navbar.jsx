import React, { useState } from "react";
import { dropdown, logo1 } from '../../../assets';
import './navbar.css';
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const nav = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLoginClick = () => {
        nav('/login');
    };

    const showCreateAccount = location.pathname !== '/';

    return (
        <nav className="navbar">
            <div>
                <img src={logo1} alt="Logo" />
            </div>
            <div className={`Options ${isMenuOpen ? 'open' : ''}`}>
                <ul className="menu">
                    <li>About <img src={dropdown} alt="Dropdown" /></li>
                    <li>Resources <img src={dropdown} alt="Dropdown" /></li>
                    <li>Company <img src={dropdown} alt="Dropdown" /></li>
                    <li>Prices <img src={dropdown} alt="Dropdown" /></li>
                </ul>
                <div className="buttons">
                    {showCreateAccount &&<a href="#" className="login" onClick={handleLoginClick}>Login</a>}
                    {showCreateAccount && <a href="#" className="create-account">Create free account</a>}
                </div>
                <button className="toggle-menu" onClick={toggleMenu}>
                    Toggle<i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </nav>
    );
}

export default NavBar;
