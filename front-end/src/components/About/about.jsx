import React from "react";
import "./about.css";
import NavBar from "../LandingPage/navbar/navbar";
import { hassaan,taha,asim } from "../../assets";
import { Footer } from "../LandingPage";

const About = () => {
  return (
    <div>
      <header>
        <div className="about-nav">
          <NavBar />
        </div>
      </header>
      <div className="about-container">
        <div className="about-section">
          <div className="dropdown">
            <h1 className="dropbtn">About Us</h1>
            <div className="dropdown-content">
              <p>
                Welcome to MyDiary, your trusted companion for capturing and
                cherishing your life's moments. Our platform is designed to provide
                you with a seamless and secure way to document your thoughts,
                experiences, and memories.
              </p>
            </div>
          </div>

          <div className="dropdown">
            <h2 className="dropbtn">Our Mission</h2>
            <div className="dropdown-content">
              <p>
                At MyDiary, our mission is to empower individuals to express
                themselves freely and preserve their personal stories in a safe,
                private, and accessible manner. We believe in the importance of
                self-expression and the value of reflecting on one’s journey.
              </p>
            </div>
          </div>

          <div className="dropdown">
            <h2 className="dropbtn">Our Team</h2>
            <div className="dropdown-content">
              <p>
                We are a diverse group of passionate professionals dedicated to
                creating a user-friendly and reliable journaling platform. Our team
                consists of developers, designers, and customer support specialists
                who work tirelessly to ensure that your experience with MyDiary is
                exceptional.
              </p>

              <div className="team-members">
                <div className="member">
                  <img src={hassaan} alt="team-member" />
                  <p>Syed Muhammad Hassaan Ali</p>
                </div>
                <div className="member">
                  <img src={taha} alt="team-member" />
                  <p>Muhammad Taha</p>
                </div>
                <div className="member">
                  <img src={asim} alt="team-member" />
                  <p>Muhammad Asim</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <h2 className="dropbtn">Why Choose Us?</h2>
            <div className="dropdown-content">
              <ul>
                <li>Easy-to-use interface</li>
                <li>Secure and private</li>
                <li>Access from anywhere</li>
                <li>Regular updates and new features</li>
                <li>Dedicated customer support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='fadeIn about-footer'><Footer/></div> */}
    </div>
  );
};

export default About;
