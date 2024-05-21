import React from "react";
import "./Card.css";

const Card = ({ imageUrl, title, description, onClick }) => {
  return (
    <div
      className="card px-0 py-0"
      style={{ borderRadius: "15px" }}
      onClick={onClick}
    >
      <div
        className="card-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="card-overlay"></div>
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
