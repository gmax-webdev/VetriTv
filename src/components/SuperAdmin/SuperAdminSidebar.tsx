'use client';

import Link from 'next/link';
import './SuperAdminSidebar.css'; // create styles here

export default function SuperAdminSidebar() {
  return (
    <aside className="superadmin-sidebar">
      <h2>Super Admin</h2>
      <nav>
        <ul>
          <li><Link href="/superadmin/dashboard">Dashboard</Link></li>
          <li><Link href="/superadmin/all-post">AllPosts</Link></li>
          <li><Link href="/superadmin/add-post">Addpost</Link></li>
          <li><Link href="/superadmin/create-user">AddUser</Link></li>
          <li><Link href="/superadmin/settings">Settings</Link></li>
          <li><button onClick={() => logout()}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
}

function logout() {
  localStorage.clear();
  window.location.href = '/superadmin'; // back to login or signup
}
