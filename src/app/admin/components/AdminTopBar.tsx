'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import './AdminTopBar.css';

export default function AdminTopBar() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Get role from metadata
        setRole(user.user_metadata?.role || 'user');

        // Get name from profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user.id)
          .single();

        if (profile?.name) {
          setName(profile.name);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="admin-topbar">
      <div className="left">
        <h3>🧭 Vetri TV Admin Panel</h3>
      </div>
      <div className="right">
        <span className="profile-name">👋 Welcome, <strong>{name}</strong></span>
        <span className="profile-role">Role: <em>{role}</em></span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
