'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Navbar/Header';
import Navbar from './Navbar/Navbar';
import TrendingBar from './Navbar/TrendingBar';
import BreakingNews from './Navbar/BreakingNewsBar';
import Footer from './Footer/Footer';

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // 👇 Only show trending & breaking on homepage
  const isHome = pathname === '/';

  return (
    <body>
      <div className="site-wrapper">
        <div className="site-container">
          <Header />
          <Navbar />
          
          {isHome && <TrendingBar />}
          {isHome && <BreakingNews />}

          <main className="page-content">{children}</main>

          <Footer />
        </div>
      </div>
    </body>
  );
};

export default LayoutClient;
