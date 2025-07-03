import '../globals.css';
import Navbar from '../components/Navbar/Navbar';
import Header from '@/components/Navbar/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'VetriTv',
  description: 'Latest trusted news',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Header/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
