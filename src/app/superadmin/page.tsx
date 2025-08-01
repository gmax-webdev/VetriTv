'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SuperAdminSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/superadmin/dashboard');
      }
    });
  }, []);

  const handleSignup = async () => {
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Insert user info with role
    await supabase.from('users').insert({
      email,
      role: 'super_admin',
    });

    // Redirect to dashboard
    router.push('/superadmin/dashboard');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👑 Super Admin Signup</h1>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', width: '300px' }}
      />
      <button onClick={handleSignup} style={{ padding: '0.5rem 1rem' }}>
        Sign Up
      </button>
    </div>
  );
}
