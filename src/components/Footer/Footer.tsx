'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: About Links */}
        <div className="footer-links-grid">
          <div className="footer-section">

            <ul>
              <li><Link href="/aboutus">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/code-of-ethics">Code of Ethics</Link></li>
              <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Right: Logo + Social Icons */}
        <div className="footer-logo-social">
          <Image
            src="/Assets/VLogo.png"
            alt="Vetri TV Logo"
            width={350}
            height={190}
            className="footer-logo"
          />
          <div className="social-icons">
            <Link href="https://web.facebook.com/vettritelevision" target="_blank"><i className="fab fa-facebook-f"></i></Link>
            <Link href="https://x.com/vettritv" target="_blank"><i className="fab fa-twitter"></i></Link>
            <Link href="https://www.youtube.com/@Vettritvnews" target="_blank"><i className="fab fa-youtube"></i></Link>
            <Link href="https://www.instagram.com/vettritv_news" target="_blank"><i className="fab fa-instagram"></i></Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Copyright © Global Max Networks Private Limited 2025. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
