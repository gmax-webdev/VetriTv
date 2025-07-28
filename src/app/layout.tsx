// src/app/layout.tsx
import '../globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Poppins } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper'; // ✅ Make sure this is correct path

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Vettri TV',
  description: 'Latest trusted news',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
