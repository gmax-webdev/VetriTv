// src/app/layout.tsx

import '../globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../components/Navbar/Navbar';
import Header from '@/components/Navbar/Header';
import TrendingBar from '@/components/Navbar/TrendingBar';
import BreakingNews from '@/components/Navbar/BreakingNewsBar';
import Footer from '@/components/Footer/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Vetri TV',
  description: 'Latest trusted news',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className="site-wrapper">
          <div className="site-container">
            <Header />
            <Navbar />
            <TrendingBar />
            <BreakingNews />
            <main className="page-content">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
