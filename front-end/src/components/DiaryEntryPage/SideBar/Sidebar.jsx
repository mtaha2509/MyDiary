import React from "react";
import "./SideBar.css";
import { ExpandIcon, ShrinkIcon } from "../../../assets";

function SideBar({ toggleSidebar, sidebarExpanded }) {
  return (
    <div
      className={`sidebar-container ${
        sidebarExpanded ? "sidebar-expanded" : ""
      }`}
    >
      <div className="sidebar">
        <div className="sidebar-toggle-button" onClick={toggleSidebar}>
          <span className="sidebar-icon">
            {sidebarExpanded ? (
              <img src={ShrinkIcon} className="sidebar-shrink-icon" />
            ) : (
              <img src={ExpandIcon} className="sidebar-expand-icon" />
            )}
          </span>
          {sidebarExpanded && (
            <span className="sidebar-label" style={{ fontSize: "medium" }}>
              Close Sidebar
            </span>
          )}
        </div>
        {sidebarExpanded && (
          <div className="sidebar-entries" style={{ fontSize: "medium" }}>
            <div className="sidebar-entry">
              <a href="#">
                <span className="sidebar-entry-label">Sticky Notes</span>
              </a>
            </div>
            <div className="sidebar-entry">
              <span className="sidebar-entry-label">To-do List</span>
            </div>
            <div className="sidebar-entry">
              <a href="/timecapsule">
                <span className="sidebar-entry-label">Time Capsule</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
