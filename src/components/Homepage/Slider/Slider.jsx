import React, { useState, useEffect } from 'react';
import { NavBar } from '../../LandingPage'; 
import SideBar from '../../DiaryEntryPage/SideBar/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const images = [
    "https://t3.ftcdn.net/jpg/02/59/31/70/360_F_259317013_nJJaBgGGzvXMd6cAyLd6yMJtbdnd61wk.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnugd5Hb62LqUY7TNopEk-AEM6l5g505tmSLtKDOaqeQ&s",
    "https://play-lh.googleusercontent.com/zG3Xs5iSUyjqpPjyj3b7PjtH5yHHiSD2vlv5FP5P5mWTOtxaIEz92_7QJs9AkIlsYg=w526-h296-rw"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <NavBar />
      <div className={`homePage-container ${sidebarExpanded ? 'expanded' : ''}`}>
        <SideBar toggleSidebar={toggleSidebar} sidebarExpanded={sidebarExpanded} />
        <div className="slider-wrapper">
          <div className="welcome-text">Welcome👋,<br /></div>
          <p style={{ marginLeft: '11%', color: '#999F9E', fontSize: '20px', marginTop: '-38px' }}>How it's going on?</p>
          <Container>
            <Row>
              {images.map((image, index) => (
                <Col key={index}>
                  <img src={image} alt={`Image ${index + 1}`} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Slider;
