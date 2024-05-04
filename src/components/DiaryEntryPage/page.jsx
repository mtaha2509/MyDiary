import React, { useState } from "react";
import { SideBar, MainNavBar } from "../DiaryEntryPage";
import "./page.css";

function DiaryEntryPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <>
      <div className={`page-container ${sidebarExpanded ? 'expanded' : ''}`}>
        <SideBar toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
        <div className="page-content">
          <MainNavBar />
          <a href="#">Choose A template</a>
        </div>
      </div>
    </>
  );
}

export default DiaryEntryPage;
