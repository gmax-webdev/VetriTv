'use client';
import React from 'react';
import LatestVideo from '../VideoFeature/LatestVideo';
import LiveUpdates from '../LiveUpdates/LiveUpdates';
import LatestNews from '../LatestNews/LatestNews';
import WorldNews from '../WorldNews/WorldNews';
import './LayoutWrapper.css'; // You can customize this file


const LayoutWrapper = () => {
  return (
    <div className="home-grid-wrapper">
      {/* Left Column */}
      <div className="left-column">
        <LatestVideo />
        <LiveUpdates />
      </div>

      {/* Center Column */}
      <div className="center-column">
        <LatestNews/>
      </div>

      {/* Right Column */}
      <div className="right-column">
        <WorldNews />
      </div>
    </div>
  );
};

export default LayoutWrapper;
