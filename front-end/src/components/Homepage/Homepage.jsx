import React, { useState } from "react";
// import { Navbar } from "react-bootstrap";
import { NavBar } from "../LandingPage";
import SideBar from "../DiaryEntryPage/SideBar/Sidebar";
import Slider from "./Slider/Slider";
import ToDoList from "./ToDoList/ToDoList";
import AIBot from "../Bot/AI/AI";
import "./Homepage.css";
import "../About/about";
import TimeCapsuleSlider from "../Homepage/TimeCapsuleSlider/TimeCapsuleSlider";
import { Footer } from "../LandingPage";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className={`homePage-container ${sidebarExpanded ? "expanded" : ""}`}>
      <NavBar />
      <SideBar
        toggleSidebar={toggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />
      <div className="homePage-content">
        <div className="homePage-slider">
          <Slider />
        </div>
        <div className="homePage-todoList">
          {/* <ToDoList /> */}
          <TimeCapsuleSlider />
        </div>
      </div>
      <AIBot />
    </div>
  );
};

export default Homepage;
