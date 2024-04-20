// LandingPage.jsx

import React, { useEffect, useState } from 'react';
import './mainpage.css'; // Importing the stylesheet
import { useSpring, animated } from 'react-spring';
// import NavBar from './components/navbar/navbar';
// import Header from "./components/header/Header"
import {Header, NavBar, Footer, Section1} from "../LandingPage"

// function LandingPage() {
//   const [isVisible, setIsVisible] = useState(false);

//   // Use react-spring to animate the content when it becomes visible
//   const contentAnimation = useSpring({
//     opacity: isVisible ? 1 : 0,
//     transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
//     delay: 500,
//   });

//   // Use useEffect to trigger animation when component mounts
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div className="landing-page">
//       <header>
//         <h1>Welcome to MyDiary+</h1>
//         <p>An innovative web-based platform for enhancing your journaling experience.</p>
//       </header>
//       <animated.section className="features" style={contentAnimation}>
//         <h2>Key Features</h2>
//         <ul>
//           <li>Multiple templates</li>
//           <li>Mood-based suggestions</li>
//           <li>Productivity tools</li>
//           <li>Personalized insights</li>
//         </ul>
//       </animated.section>
//       <animated.section className="cta" style={contentAnimation}>
//         <p>Ready to start journaling?</p>
//         <button>Sign Up Now</button>
//       </animated.section>
//       <footer>
//         <p>&copy; 2024 MyDiary+</p>
//       </footer>
//     </div>
//   );
// }

function LandingPage(){
  return(
    <>
    <NavBar />
    <Header/>
    <Section1/>
    <Footer/>
    </>
  )
}

export default LandingPage;
