import React, { useState } from "react";
import "./SideBar.css";
import {ExpandIcon, ShrinkIcon} from "../../../assets";


function SideBar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`sidebar-container ${expanded ? 'expanded' : ''}`}>
      <div className="side-bar">
        <div className="toggle-button" onClick={toggleSidebar}>
          <span className="icon">{expanded ? <img src={ShrinkIcon} className="shrink-icon"/> : <img src={ExpandIcon} className="expand-icon"/>}</span>
          {expanded && <span className="label">Close Sidebar</span>}
        </div>
        {expanded && (
          <div className="sidebar-entries">
            <div className="sidebar-entry">
              {/* <StickyNotesIcon className="entry-icon" /> */}
              <span className="entry-label">Sticky Notes</span>
            </div>
            <div className="sidebar-entry">
              {/* <TodoListIcon className="entry-icon" /> */}
              <span className="entry-label">To-do List</span>
            </div>
            <div className="sidebar-entry">
              {/* <TimeCapsuleIcon className="entry-icon" /> */}
              <span className="entry-label">Time Capsule</span>
            </div>
            {/* Add more entries as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;
