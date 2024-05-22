import React, { useEffect, useRef } from "react";
import "./about.css";
import NavBar from "../LandingPage/navbar/navbar";
import { hassaan, taha, asim } from "../../assets";
import { Footer } from "../LandingPage";

const About = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const L = window.L;
    const map = L.map(mapRef.current).setView([31.48171749391388, 74.30306823824712], 13); // Replace with your desired coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([31.48171749391388, 74.30306823824712]) // Replace with your desired coordinates
      .addTo(map)
      .bindPopup('Our Location')
      .openPopup();
  }, []);

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
            <h1 className="dropbtn" style={{ textAlign: "center" }}>About Us</h1>
            <div className="dropdown-content">
              <p style={{ fontSize: "medium" }}>
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
              <p style={{ fontSize: "medium" }}>
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
              <p style={{ fontSize: "medium" }}>
                We are a diverse group of passionate professionals dedicated to
                creating a user-friendly and reliable journaling platform. Our team
                consists of developers, designers, and customer support specialists
                who work tirelessly to ensure that your experience with MyDiary is
                exceptional. <br /><br /><br />
                <span style={{ fontWeight: "Bold" }}>Meet the faces behind MyDiary:</span>
              </p>

              <div className="team-members">
                <div className="member">
                  <div className="image-container">
                    <img src={hassaan} alt="Syed Muhammad Hassaan Ali" style={{ width:"70%", height:"15%" }} />
                    <div className="description">Syed Muhammad Hassaan Ali - Developer</div>
                  </div>
                  <p style={{ fontWeight: "bold" }}>Syed Muhammad Hassaan Ali</p>
                </div>
                <div className="member">
                  <div className="image-container">
                    <img src={taha} alt="Muhammad Taha" style={{ width:"100%", heigh:"20%" }} />
                    <div className="description">Muhammad Taha - Designer</div>
                  </div>
                  <p style={{ fontWeight: "bold" }}>Muhammad Taha</p>
                </div>
                <div className="member">
                  <div className="image-container">
                    <img src={asim} alt="Muhammad Asim" style={{ width:"100%", heigh:"20%" }} />
                    <div className="description">Muhammad Asim - Project Manager</div>
                  </div>
                  <p style={{ fontWeight: "bold" }}>Muhammad Asim</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <h2 className="dropbtn">Why Choose Us?</h2>
            <div className="dropdown-content">
              <ul style={{ fontSize: "medium" }}>
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

      <div className="map-section">
        <h2 style={{ textAlign: "center" }}>Our Location</h2>
        <div
          ref={mapRef}
          style={{
            height: '400px', // Adjust the height as needed
            width: '100%',
          }}
        />
      </div>
      
      <div className='fadeIn about-footer'><Footer/></div>
    </div>
  );
};

export default About;
