import React from 'react';
import './Spinner.css';

const Spinner = () => (
  <div className="Spinner">
    <div className="beat-container">
      <div className="beat-loader">
        <div className="beat beat-top"></div>
        <div className="beat beat-top"></div>
        <div className="beat beat-top"></div>
        <div className="beat beat-top"></div>
        <div className="beat beat-top"></div>
        <div className="beat beat-top"></div>
      </div>
    </div>
  </div>
);

export default Spinner;