import React from 'react';
import './Paper.css';

const Paper = ({ children }) => {
  return (
    <div className="paper-container">
      <div className="paper">
        <div className="line" />
        <div className="line" />
        {children}
      </div>
    </div>
  );
};

export default Paper;
