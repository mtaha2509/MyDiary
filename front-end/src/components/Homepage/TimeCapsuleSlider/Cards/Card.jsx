import React, { useState, useEffect } from "react";
import "./Card.css";

const Card = ({
  imageUrl,
  title,
  messageToFutureSelf,
  onClick,
  openDateTime,
  id,
}) => {
  const calculateTimeLeft = (openDateTime) => {
    const now = new Date().getTime();
    const openDate = new Date(openDateTime).getTime();

    const difference = openDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = null;
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(openDateTime));
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(openDateTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === null && !expired) {
        setExpired(true);
      }
    }, 1000);

    // Clear the timer if the capsule is expired
    if (expired) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [openDateTime, expired]);

  const formatTime = (time) => {
    if (time === null) {
      return "Time's up!";
    }

    return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  };

  const handleClick = () => {
    onClick(id, expired);
  };

  return (
    <div className="time-card" onClick={handleClick}>
      <div className="time-card-content">
        <h3 className="time-card-title">{title}</h3>
        <div className="time-card-timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Card;
