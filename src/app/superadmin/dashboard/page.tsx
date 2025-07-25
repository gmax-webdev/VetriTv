'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './dashboard.css'; // Optional custom styles

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('updater');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ✅ Check user and role
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.user_metadata.role !== 'admin') {
        router.push('/login'); // Redirect if not super admin
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const email = `${username.toLowerCase()}@vettritv.lk`;

    try {
      const { data, error: signUpError } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: {
          username,
          name: fullName,
          role,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // Optional: Add to profiles table
      await supabase.from('profiles').insert([
        {
          id: data.user?.id,
          name: fullName,
        },
      ]);

      setMessage('✅ User created successfully!');
      setUsername('');
      setPassword('');
      setFullName('');
    } catch (err: any) {
      setError(err.message || 'Failed to create user');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, Super Admin</h2>
      <h3>Create New User</h3>

      <form onSubmit={handleCreateUser} className="create-user-form">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="updater">News Updater</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Create User</button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
