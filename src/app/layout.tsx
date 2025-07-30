// src/app/layout.tsx
import '../globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Poppins } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper'; // ✅ Make sure this is correct path
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Vettri TV - Trusted Tamil News',
    template: '%s | Vettri TV',
  },
  description: 'Get the latest Tamil news updates including politics, local news, world news, and more from Vettri TV.',
  keywords: ['Tamil News', 'Sri Lanka News', 'Vetri TV', 'Politics', 'Local News', 'Breaking News'],
  authors: [{ name: 'Vetri TV', url: 'https://vettritv.lk' }],
  creator: 'Vetri TV Team',
  metadataBase: new URL('https://vettritv.lk'),
  openGraph: {
    title: 'Vettri TV - Trusted Tamil News',
    description: 'Latest Tamil headlines and breaking news from Sri Lanka and around the world.',
    url: 'https://vettritv.lk',
    siteName: 'Vettri TV',
    images: [
      {
        url: 'https://vettritv.lk/Assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Vetri TV Logo',
      },
    ],
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vettri TV - Trusted Tamil News',
    description: 'Latest Tamil headlines and breaking news from Sri Lanka and around the world.',
    images: ['https://vettritv.lk/Assets/logo.png'],
    creator: '@vetritv',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <LayoutWrapper>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </LayoutWrapper>
      </body>
    </html>
  );
}
