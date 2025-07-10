'use client';

import React, { useState } from 'react';
import './Navbar.css';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Latest News', href: '/latest-news' },
  { label: 'Main News', href: '/main-news' },
  {
    label: 'More',
    href: '#',
    dropdown: [
      'World',
      'Sports',
      'Political',
      'World Political',
      'Local',
      'Education',
      'Science',
      'Technology',
      'Cinema',
    ],
  },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <nav className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <div key={item.label} className="nav-item">
              <Link href={item.href} className="nav-link">
                {item.label}
              </Link>

              {/* Dropdown items */}
              {item.dropdown && (
                <div className="dropdown">
                  {item.dropdown.map((sub) => (
                    <Link
                      key={sub}
                      href={`/${sub
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w-]/g, '')}`}
                      className="dropdown-link"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar-controls">
         <Link href="/live" >
          <button className="live-btn">LIVE</button>
          </Link>
        </div>

        <div
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
