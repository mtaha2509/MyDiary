import React from "react";
import "./SideBar.css";

import { ExpandIcon, ShrinkIcon,gif } from "../../../assets";

import { useDispatch } from "react-redux";

import { authenticateUser } from "../../../redux/slices/authSlice";
import "../../BlogPage/BlogPage"
import { useNavigate } from "react-router-dom";
import "../../todolist/todolist"


function SideBar({ toggleSidebar, sidebarExpanded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // dispatch(authenticateUser());
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
            <img src={gif} alt="bruh" className={`sidebar-gif ${sidebarExpanded ? 'hidden' : ''}`} />
            {sidebarExpanded ? (
              <img src={ShrinkIcon} className="sidebar-shrink-icon" />
            ) : (
              <img src={ExpandIcon} className="sidebar-expand-icon"/>
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
                <span className="sidebar-entry-label">Sticky Notes</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="/todolist" onClick={() => handleNavigation("/todolist")}>
                <span className="sidebar-entry-label">To-do List</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/timecapsule")}>
                <span className="sidebar-entry-label">Time Capsule</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/diarypage")}>
                <span className="sidebar-entry-label">Diary Entry</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <a href="#" onClick={() => handleNavigation("/BlogPage")}>
                <span className="sidebar-entry-label">Blog Page</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
