import React, { useEffect, useState } from "react";
import "./Card.css";

const Card = ({
  imageUrl,
  title,
  messageToFutureSelf,
  onClick,
  openDateTime,
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
  const [notificationShown, setNotificationShown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(openDateTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === null && !notificationShown) {
        setNotificationShown(true);
        clearInterval(timer);
        if (window.location.pathname !== "/homepage") {
          alert("Time Capsule has Opened");
        } else {
          onClick();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [openDateTime, onClick, notificationShown]);

  const formatTime = (time) => {
    if (time === null) {
      return "Time's up!";
    }

    return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  };

  return (
    <div className="time-card" onClick={onClick}>
      <div className="time-card-content">
        <h3 className="time-card-title">{title}</h3>
        <div className="time-card-timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Card;
