import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./Cards/Card";
import axios from "axios";
import "./Slider.css";
import Modal from "../Modal/Modal";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [cardsToShow, setCardsToShow] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/diarypage");
        setDiaryEntries(response.data);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchDiaryEntries();

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

  const totalCards = diaryEntries.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalCards - 1 : prevIndex - 1
    );
  };

  const handleCardClick = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const startIndex = currentIndex;
  const endIndex = (startIndex + cardsToShow - 1) % totalCards;

  return (
    <div className="slider-wrapper">
      <div className="welcome-text">
        Welcome👋,
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
        How's it going?
      </p>
      <div className="slider-container">
        <div className="Diaries">My Diaries</div>
        <Row className="card-row">
          {[...Array(cardsToShow)].map((_, index) => {
            const actualIndex = (startIndex + index) % totalCards;
            const entry = diaryEntries[actualIndex];
            return (
              <Col key={index} xs={12} md={6} lg={3}>
                <Card
                  imageUrl={entry?.template_url}
                  title={entry?.title}
                  description={
                    entry?.content.split(" ").slice(0, 5).join(" ") + "..."
                  }
                  onClick={() => handleCardClick(entry)}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="buttons">
        <button
          className="prev-button"
          onClick={handlePrev}
          disabled={totalCards <= cardsToShow}
        >
          Prev
        </button>
        <button
          className="next-button"
          onClick={handleNext}
          disabled={totalCards <= cardsToShow}
        >
          Next
        </button>
      </div>

      {selectedEntry && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          content={selectedEntry.content}
          title={selectedEntry.title}
          templateUrl={selectedEntry.template_url}
        />
      )}
    </div>
  );
};

export default Slider;
