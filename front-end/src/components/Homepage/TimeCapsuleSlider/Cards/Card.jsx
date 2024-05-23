import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal"; // Adjust the path as necessary
import "./Card.css";
import { useDispatch } from "react-redux";
import {
  openCapsule,
  setActiveModal,
} from "../../../../redux/slices/timeCapsuleSlice";

const Card = ({
  imageUrl,
  title,
  messageToFutureSelf,
  openDateTime,
  timecapsule_id,
  opened,
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
  const [timerActive, setTimerActive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!timerActive) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(openDateTime);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === null) {
        setTimerActive(false);
        dispatch(openCapsule(timecapsule_id));
        dispatch(setActiveModal(timecapsule_id));
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [openDateTime, timecapsule_id, timerActive, dispatch]);

  const handleCardClick = () => {
    if (!timerActive && opened) {
      dispatch(setActiveModal(timecapsule_id));
    }
  };

  const formatTime = (time) => {
    if (time === null) {
      return "Time's up!";
    }

    return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
  };

  return (
    <div className="time-card" onClick={handleCardClick}>
      <div className="time-card-content">
        <h3 className="time-card-title">{title}</h3>
        <div className="time-card-timer">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Card;
