'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Navbar/Header';
import Navbar from './Navbar/Navbar';
import TrendingBar from './Navbar/TrendingBar';
import BreakingNews from './Navbar/BreakingNewsBar';
import Footer from './Footer/Footer';
import YouTubeShorts from '@/components/Homepage/YouTubeShorts/YouTubeShorts';
import LocalAndPoliticalLayout from '@/components/Homepage/LocalAndPoliticalNews/LocalAndPoliticalLayout';
import SportsSection from '@/components/Homepage/SportsNews/SportsSection'; 
import CinemaNews from '@/components/Homepage/CinemaNews/CinemaNews';
import '@/globals.css';

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
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

          {/* ✅ Show only on homepage */}
        {isHome && (
            <div className="section-divider-top">
               <YouTubeShorts />
            </div>
        )}
          {isHome && <LocalAndPoliticalLayout />}
          {isHome && (
            <div className="section-divider-top">
               <SportsSection />
            </div>
        )}
          {isHome && <CinemaNews/>}
          <Footer />
        </div>
      </div>
    </body>
  );
};

export default LayoutClient;

