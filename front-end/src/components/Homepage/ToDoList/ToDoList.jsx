// ToDoList.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../Slider/Cards/Card';
import './ToDoList.css'; // Import the new CSS file
import { Logo2 } from "../../../assets";

const ToDoList = () => {
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
    <div className="todo-list-wrapper"> {/* Change the className */}
      <div className="welcome-text">To-Do List<br /></div>
      <p style={{ marginLeft: '5%', color: '#999F9E', fontSize: '25px', marginTop: '10px' }}>Woah, It seems you're a heavy do'er😮</p>
      <div className="todo-list-container"> {/* Change the className */}
        <div className="Diaries">
          My To-Do List
        </div>
        <Row className="todo-card-row"> {/* Change the className */}
          {[...Array(initialCards)].map((_, index) => {
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
      <div className="todo-buttons"> {/* Change the className */}
        <button className="todo-prev-button" onClick={handlePrev}>Prev</button> {/* Change the className */}
        <button className="todo-next-button" onClick={handleNext}>Next</button> {/* Change the className */}
      </div>
    </div>
  );
};

export default ToDoList;
