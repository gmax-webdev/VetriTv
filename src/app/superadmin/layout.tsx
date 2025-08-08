import SuperAdminSidebar from '@/components/SuperAdmin/SuperAdminSidebar';
// import '@/app/superadmin/superadmin.css';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="superadmin-layout">
      <SuperAdminSidebar />
      <div className="superadmin-content">
        {children}
      </div>
    </div>
  );
}
