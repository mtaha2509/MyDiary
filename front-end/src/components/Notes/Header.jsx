import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import "./notes.css";

function Header() {
  return (
    <header className="notes-header">
      <h1>
        <HighlightIcon />
        MyDiary+
      </h1>
    </header>
  );
}

export default Header;
