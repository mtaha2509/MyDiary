import React from 'react';
import './BoxComponent.css'; // Import your CSS file

const BoxComponent = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex justify-content-center">
          <div className="box">
            <div className="box-body">
              <div className="items-container">
                <img className="item shoe" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ1VVztH2GrKmWF1tIyF-00gnfu89byVhwMxLbV-d9jQ&amp;s" alt="shoe" />
                <img className="item watch" src="https://ronin.pk/cdn/shop/files/R-09SmartWatchSilver1.png?v=1708364244" alt="watch" />
              </div>
              <div className="box-lid"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxComponent;
