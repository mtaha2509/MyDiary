import React from "react";
import "./SideBar.css";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import NoteIcon from "@mui/icons-material/Note";
import ListIcon from "@mui/icons-material/List";
import ArchiveIcon from "@mui/icons-material/Archive";
import BookIcon from "@mui/icons-material/Book";
import ArticleIcon from "@mui/icons-material/Article";
import { ExpandIcon, ShrinkIcon, gif } from "../../../assets";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SideBar({ toggleSidebar, sidebarExpanded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className={`sidebar-container ${
        sidebarExpanded ? "sidebar-expanded" : ""
      }`}
    >
      <div className="sidebar">
        <div className="sidebar-toggle-button" onClick={toggleSidebar}>
          <div className="sidebar-icon">
            <img
              src={gif}
              alt="bruh"
              className={`sidebar-gif ${sidebarExpanded ? "hidden" : ""}`}
            />
            {sidebarExpanded ? (
              <img src={ShrinkIcon} className="sidebar-shrink-icon" />
            ) : (
              <img src={ExpandIcon} className="sidebar-expand-icon" />
            )}
          </div>
          {sidebarExpanded && (
            <span className="sidebar-label" style={{ fontSize: "medium" }}>
              Close Sidebar
            </span>
          )}
        </div>
        {sidebarExpanded && (
          <div className="sidebar-entries" style={{ fontSize: "medium" }}>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/notes")}>
                <NoteIcon className="sidebar-entry-icon" />
                <span className="sidebar-entry-label">Sticky Notes</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="/todolist" onClick={() => handleNavigation("/todolist")}>
                <ListIcon className="sidebar-entry-icon" />
                <span className="sidebar-entry-label">To-do List</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/timecapsule")}>
                <ArchiveIcon className="sidebar-entry-icon" />
                <span className="sidebar-entry-label">Time Capsule</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/diarypage")}>
                <BookIcon className="sidebar-entry-icon" />
                <span className="sidebar-entry-label">Diary Entry</span>
              </a>
            </div>
            {/* <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/BlogPage")}>
                <ArticleIcon className="sidebar-entry-icon" />
                <span className="sidebar-entry-label">Blog Page</span>
              </a>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
