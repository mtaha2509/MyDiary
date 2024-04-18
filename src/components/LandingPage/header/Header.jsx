import React from 'react';
import './Header.css';
import { Diary } from '../../../assets';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="header-content">
              <h1 className="header-title">
                Write Your Story: <br />
                <span>Reflect, Grow and Connect</span> with MyDiary+!
              </h1>
              <p className="header-description">
                Transform Your Thoughts. Beyond Text, A Diary Reimagined.
                Connect, Reflect, and Flourish.
              </p>
              <a href="#" className="demo-btn">
                TRY IT FOR FREE
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img src={Diary} alt="MyDiary+ Logo" className="header-image" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
