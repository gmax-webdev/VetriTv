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
            width={350}
            height={200}
            className="header-logo"
          />
        </div>

        <div className="social-icons">
          <a
            href="https://www.youtube.com/@Vettritvnews" // ✅ Replace with your real link
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://web.facebook.com/vettritelevision" // ✅ Replace with your real link
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/vettritv_news/" // ✅ Replace with your real link
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://x.com/vettritv" // ✅ Replace with your real link
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
