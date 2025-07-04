'use client';

import React from 'react';
import Link from 'next/link';
import { FiTrendingUp } from 'react-icons/fi';
import './TrendingBar.css';

const TrendingBar = () => {
  return (
    <div className="trending-container">
      <div className="trending-inner">
        <FiTrendingUp className="trending-icon" />
        <span className="trending-label">Trending</span>
        <span className="trending-separator">&gt;</span>
        <div className="trending-links">
          <Link href="/">War on Gaza</Link>
          <Link href="/">Donald Trump</Link>
          <Link href="/">Sean Combs verdict</Link>
          <Link href="/">Russia-Ukraine war</Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingBar;
