import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Cards/Card"; // Adjust the path as necessary
import Modal from "./Modal/Modal"; // Adjust the path as necessary
import axios from "axios";
import "./TimeCapsuleSlider.css";

const TimeCapsuleSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeCapsules, setTimeCapsules] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [showModalIndex, setShowModalIndex] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const fetchTimeCapsules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getTimeCapsule"
        );
        console.log(response.data);
        setTimeCapsules(response.data);
      } catch (error) {
        console.error("Error fetching time capsules:", error);
      }
    };

    fetchTimeCapsules();

    const updateCardsToShow = () => {
      if (window.innerWidth <= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(4);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const totalCards = timeCapsules.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  const handleCardClick = (index, expired) => {
    console.log(index);
    setShowModalIndex(index);
    setIsExpired(expired);
  };

  const handleCloseModal = () => {
    setShowModalIndex(null);
    setIsExpired(false);
  };

  const startIndex = currentIndex;
  const endIndex = (startIndex + cardsToShow - 1) % totalCards;

  return (
    <div className="slider-wrapper">
      <div className="catchy-hook">
        Journey Through Time 🚀
        <br />
      </div>
      <p
        style={{
          marginLeft: "5%",
          color: "#999F9E",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Ready to unlock your memories?
      </p>
      <div className="slider-container">
        <div className="Capsules">My Time Capsules</div>
        {totalCards === 0 ? (
          <div className="no-entries-message">
            Oh no! You haven't set any time capsules yet!!
            <br />
            <a href="/timecapsule" className="set-link">
              Click here to create your first Time Capsule
            </a>
          </div>
        ) : (
          <Row className="card-row">
            {[...Array(Math.min(cardsToShow, totalCards))].map((_, index) => {
              const actualIndex = (startIndex + index) % totalCards;
              const capsule = timeCapsules[actualIndex];
              return (
                <Col key={index} xs={12} md={6} lg={3}>
                  <Card
                    imageUrl={capsule.image_url}
                    title={capsule.title}
                    messageToFutureSelf={capsule.message_to_future_self}
                    openDateTime={capsule.opendatetime}
                    id={index}
                    onClick={handleCardClick}
                  />
                </Col>
              );
            })}
          </Row>
        )}
        <div className="slider-buttons">
          <button className="prev-button" onClick={handlePrev}>
            &lt;
          </button>
          <button className="next-button" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
      {showModalIndex !== null && isExpired === true && (
        <Modal
          show={true}
          onClose={handleCloseModal}
          title={timeCapsules[showModalIndex]?.title}
          imageUrl={timeCapsules[showModalIndex]?.image_url}
          messageToFutureSelf={
            timeCapsules[showModalIndex]?.message_to_future_self
          }
        />
      )}
    </div>
  );
};

export default TimeCapsuleSlider;