import React, { useEffect, useState } from "react";
import "./mainpage.css"; // Importing the stylesheet
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";
import { Header, NavBar, Footer, Section1, Section2 } from "../LandingPage";

function LandingPage() {
  return (
    <div className="fadeIn">
      <NavBar />
      <Header />
      <Section1 />
      <Section2 />
      <Footer />
    </div>
  );
}

export default LandingPage;
