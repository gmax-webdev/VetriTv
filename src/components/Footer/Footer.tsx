'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo and social icons */}
        <div className="footer-logo-social">
          <Image
            src="/Assets/VLogo.png"
            alt="Vetri TV Logo"
            width={350}
            height={180}
            className="footer-logo"
          />
          <p className="footer-heading">Get To Know Us</p>
          <div className="social-icons">
            <Link href="#"><i className="fab fa-twitter"></i></Link>
            <Link href="#"><i className="fab fa-youtube"></i></Link>
            <Link href="#"><i className="fab fa-instagram"></i></Link>
            <Link href="#"><i className="fab fa-dribbble"></i></Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4>Subscribe Our Newsletter</h4>
          <p>Signup for our Newsletter and stay informed<br />Some asteroids have us in their</p>
          <form>
            <input type="email" placeholder="Enter Your e-mail" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>Copyright © Global Max Networks Private Limited 2025. All rights reserved</p>
        <div className="footer-links">
          <Link href="#">About Us</Link>
          <Link href="#">Private Policy</Link>
          <Link href="#">Forums</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
