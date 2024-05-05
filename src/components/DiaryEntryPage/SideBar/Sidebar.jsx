import React from "react";
import "./SideBar.css";
import {ExpandIcon, ShrinkIcon} from "../../../assets";

function SideBar({ toggleSidebar, sidebarExpanded }) {
  return (
    <div className={`sidebar-container ${sidebarExpanded ? 'expanded' : ''}`}>
      <div className="side-bar">
        <div className="toggle-button" onClick={toggleSidebar}>
          <span className="icon">{sidebarExpanded ? <img src={ShrinkIcon} className="shrink-icon"/> : <img src={ExpandIcon} className="expand-icon"/>}</span>
          {sidebarExpanded && <span className="label">Close Sidebar</span>}
        </div>
        {sidebarExpanded && (
          <div className="entries">
            <div className="entry">
              <span className="entry-label">Sticky Notes</span>
            </div>
            <div className="entry">
              <span className="entry-label">To-do List</span>
            </div>
            <div className="entry">
              <span className="entry-label">Time Capsule</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
