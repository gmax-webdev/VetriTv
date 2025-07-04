'use client';

import React from 'react';
import './BreakingNewsBar.css';

const BreakingNewsBar = () => {
  return (
    <div className="breaking-wrapper">
      <div className="breaking-label">
        <span>BREAKING</span>
        <span className="news-text">NEWS</span>
      </div>
      <div className="breaking-ticker">
        <div className="ticker-content">
          <span>
            🟡 Vetri TV Exclusive: Major update from Parliament — 🟡 Heavy rainfall in Tamil Nadu — 🟡 Election Results LIVE — 🟡 Sports: India wins the final — 🟡 Breaking: Petrol prices updated nationwide
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
