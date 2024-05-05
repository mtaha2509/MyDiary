import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './Cards/Card';
import './Slider.css';
import { Logo2 } from "../../../assets";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = 10; // Total number of cards
  const initialCards = 4; // Number of cards to display initially

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === totalCards - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? totalCards - 1 : prevIndex - 1));
  };

  // Calculate the start and end indices based on the current index
  const start = currentIndex;
  const end = (currentIndex + initialCards - 1) % totalCards;

  return (
    <div className="slider-wrapper">
      <div className="welcome-text">Welcome👋,<br /></div>
      <p style={{ marginLeft: '5%', color: '#999F9E', fontSize: '20px', marginTop: '10px' }}>How's it going?</p>
      <div className="slider-container">
        <Row className="card-row">
          {[...Array(initialCards)].map((_, index) => {
            // Calculate the actual index based on the start index
            const actualIndex = (start + index) % totalCards;
            return (
              <Col key={index}>
                <Card
                  imageUrl={Logo2}
                  title={`Title ${actualIndex + 1}`}
                  description="Description goes here"
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="buttons">
        <button className="prev-button" onClick={handlePrev}>Prev</button>
        <button className="next-button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Slider;
