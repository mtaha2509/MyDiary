import React from "react";
import { NavBar } from "../LandingPage";
import SideBar from "../DiaryEntryPage/SideBar/Sidebar";
import "./Homepage.css";
import Slider from "./Slider/Slider";

const Homepage = () => {


  return (
    <div className="fadeIn">
      <Slider/>
    </div>
  );
}

export default Homepage;
