// TemplateCard.jsx
import React from "react";
import "./TemplateCard.css";

function TemplateCard({ thumbnail, name, description, onSelect }) {
  return (
    <div className="template-card" onClick={onSelect}>
      <div
        className="template-image"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="template-content">
        <h2 className="template-name">{name}</h2>
        <p className="template-description">{description}</p>
      </div>
    </div>
  );
}

export default TemplateCard;
