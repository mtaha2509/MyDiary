import React from "react";
import "./notes.css";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="notes-footer">
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
