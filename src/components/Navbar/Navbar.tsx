// src/components/Navbar/Navbar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import SubNavbar from '../SubNavbar/SubNavbar';

const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/Assets/VLogo.png" alt="Vetri Tv" width={400} height={250} />
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/news">News</Link></li>
          <li><Link href="/india">India</Link></li>
          <li><Link href="/world">World</Link></li>
          <li><Link href="/sports">Sports</Link></li>
          <li><Link href="/business">Business</Link></li>
          <li><Link href="/tech">Tech</Link></li>
        </ul>
      </nav>
      <SubNavbar />
    </>
  );
};

export default Navbar;
