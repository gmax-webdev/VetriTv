// src/app/admin/layout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './components/sidebar';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-container">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <main className="admin-main">
        {/* <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="toggle-sidebar"
        >
          ☰
        </button> */}
        {children}
      </main>
    </div>
  );
}
