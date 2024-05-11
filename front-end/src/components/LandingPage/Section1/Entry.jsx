import React, { useState, useEffect } from "react";
import "./Entry.css";

function Entry(props) {
  const [isVisible, setIsVisible] = useState(false);
  const devColor = {
    backgroundColor: props.color
}
  useEffect(() => {
    const handleScroll = () => {
      const entry = document.querySelector(".entry-container");
      if (entry) {
        const top = entry.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={devColor} className={`entry-container ${isVisible ? 'animate' : ''}`}>
      <img src={props.img} alt={props.title} className="entry-image" />
      <div className="entry-content">
        <h4 className="entry-title">{props.title}</h4>
        <p className="entry-description">{props.desc}</p>
      </div>
    </div>
  );
}

export default Entry;
