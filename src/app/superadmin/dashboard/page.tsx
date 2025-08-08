'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SuperAdminDashboard() {
  const [email, setEmail] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/admin/login'); // Not logged in
        return;
      }

      const role = user.user_metadata?.role;

      if (role !== 'admin') {
        setAccessDenied(true);
        return;
      }

      setEmail(user.email || '');
    };

    checkAuth();
  }, []);

  if (accessDenied) {
    return <div style={{ padding: '2rem' }}>❌ Access Denied: Not a Super Admin</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, Super Admin!</h1>
      <p>Logged in as: <strong>{email}</strong></p>
    </div>
  );
}
