// src/app/admin/components/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'All Posts', path: '/admin/all-posts' },
  { name: 'Add Post', path: '/admin/add-post' },
  { name: 'My Posts', path: '/admin/my-posts' },
  { name: 'Categories', path: '/admin/categories' },
  { name: 'Comments', path: '/admin/comments' },
  { name: 'Profile', path: '/admin/profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-logo">📰 Vetri TV Admin</div>
      <ul>
        {navItems.map((item) => (
          <li key={item.path}>
            <Link href={item.path} className={pathname === item.path ? 'active' : ''}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
