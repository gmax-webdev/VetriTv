'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function SuperAdminDashboard() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/superadmin');
        return;
      }
      setEmail(user.email || '');
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Welcome, Super Admin!</h1>
      <p>Logged in as: <strong>{email}</strong></p>
    </div>
  );
}
