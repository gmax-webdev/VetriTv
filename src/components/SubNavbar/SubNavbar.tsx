// src/components/SubNavbar/SubNavbar.tsx
import Link from 'next/link';
import styles from './SubNavbar.module.css';

const categories = ['Latest', 'Tamil Nadu', 'Politics', 'Health', 'Culture', 'Environment'];

const SubNavbar = () => {
  return (
    <div className={styles.subNavbar}>
      <ul>
        {categories.map((cat) => (
          <li key={cat}>
            <Link href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubNavbar;
