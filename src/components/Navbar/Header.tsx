'use client';

import React from 'react';
import './Navbar.css';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="top-header">
      <div className="top-header-content">
        <div className="logo-container">
          <Image
            src="/Assets/VLogo.png"
            alt="Vetri TV"
            width={400}
            height={280}
            className="header-logo"
          />
        </div>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fas fa-globe"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
