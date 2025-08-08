'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './components/sidebar';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Only hide sidebar on login page
  const hideSidebar = pathname === '/admin/login';

  return (
    <div className="admin-container">
      {!hideSidebar && (
        <div className="admin-sidebar">
          <Sidebar />
        </div>
      )}
      <main
        className={`admin-main ${hideSidebar ? 'full-width' : ''}`}
        style={hideSidebar ? { padding: '0', width: '100%' } : {}}
      >
        {children}
      </main>
    </div>
  );
}
