import '../globals.css';
import Navbar from '../components/Navbar/Navbar';
import SubNavbar from '../components/SubNavbar/SubNavbar';

export const metadata = {
  title: 'VetriTv',
  description: 'Latest trusted news',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* <SubNavbar /> */}
        {children}
      </body>
    </html>
  );
}
