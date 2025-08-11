'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Check auth session on mount
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        // User already logged in, redirect to dashboard
        router.replace('/admin/dashboard');
      }
    });
  }, [router]);

  const handleLogin = async () => {
    setMessage('');
    if (!email || !password) {
      setMessage('⚠ Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(`❌ ${error.message}`);
        setLoading(false);
        return;
      }

      if (!data.session) {
        setMessage('❌ Login failed. No session returned.');
        setLoading(false);
        return;
      }

      setMessage('✅ Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1200);
    } catch (err) {
      setMessage('❌ Unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: '60px auto',
      padding: 20,
      border: '1px solid #ccc',
      borderRadius: 8,
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>News Updater Login</h1>

      <label style={{ fontWeight: 'bold' }}>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 15, borderRadius: 4, border: '1px solid #aaa' }}
        autoComplete="email"
        disabled={loading}
      />

      <label style={{ fontWeight: 'bold' }}>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 8, marginBottom: 20, borderRadius: 4, border: '1px solid #aaa' }}
        autoComplete="current-password"
        disabled={loading}
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#900f0f',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: 5,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <p style={{ marginTop: 15, color: message.startsWith('❌') ? 'red' : 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </div>
  );
}
