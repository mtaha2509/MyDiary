import React, { useState } from "react";
// import { Navbar } from "react-bootstrap";
import { NavBar } from "../LandingPage";
import SideBar from "../DiaryEntryPage/SideBar/Sidebar";
import Slider from "./Slider/Slider";
import ToDoList from "./ToDoList/ToDoList";
import AIBot from "../Bot/AI/AI";
import "./Homepage.css";
import "../About/about";
import { Footer } from "../LandingPage";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch();
  const [protectedData, setProtectedData] = useState(null);
  const dummyImages = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // const logout = () => {
  //   try {
  //     dispatch(unauthenticateUser());
  //     localStorage.removeItem("isAuth");
  //     localStorage.removeItem("user");
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // };

  return (
    <div className={`homePage-container ${sidebarExpanded ? "expanded" : ""}`}>
      <NavBar />
      {/* <button onClick={() => logout()} className="btn btn-primary"></button> */}
      <SideBar
        toggleSidebar={toggleSidebar}
        sidebarExpanded={sidebarExpanded}
      />
      <div className="homePage-content">
        <div className="homePage-slider">
          <Slider images={dummyImages} />
        </div>
        <div className="homePage-todoList">
          <ToDoList images={dummyImages} />
        </div>
      </div>
      <AIBot />
    </div>
  );
};

export default Homepage;
