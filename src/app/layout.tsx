// src/app/layout.tsx
import '../globals.css'; // ✅ Fixed path
import Navbar from '../components/Navbar/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vetri TV',
  description: 'News from Tamil Nadu and beyond',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
