import React from 'react';
import './Card.css';

const Card = ({ imageUrl, title, description }) => {
  return (
    <div className="card">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="content">
          <h3 className="title">{title}</h3>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
