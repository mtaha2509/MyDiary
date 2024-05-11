import React from "react";
import { Logo2 } from "../../../assets";
import "./Section2.css";

function Section2() {
  return (
    <section className="section2-container" style={{ backgroundColor: "#FF6D2C" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 content-div">
            <div className="section2-content">
              <h2>TRY MyDiary+ For Free</h2>
              <div>
                <p>Start your very own, personalized journaling journey!</p>
                <a href="#" className="get-started-button">Get Started</a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <img src={Logo2} alt="MyDiary+ Logo" className="section2-image" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section2;
