// TemplateCard.jsx
import React from "react";
import "./TemplateCard.css"; // Add CSS for styling the card

function TemplateCard({ thumbnail, name, description }) {
  return (
    <div className="template-card">
      <div className="template-image">
        <img src={thumbnail} alt={name} />
      </div>
      <div className="template-details">
        <h3 className="template-name">{name}</h3>
        <p className="template-description">{description}</p>
      </div>
    </div>
  );
}

export default TemplateCard;
