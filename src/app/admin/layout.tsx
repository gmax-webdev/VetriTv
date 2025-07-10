// src/app/admin/layout.tsx
import Sidebar from './components/sidebar';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}
