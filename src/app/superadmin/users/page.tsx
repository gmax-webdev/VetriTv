'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Profile = {
  id: string;
  email: string;
  role?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Load all users from profiles table
  async function fetchUsers() {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, role')
      .order('email');

    if (error) {
      console.error('Error fetching users:', error.message);
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create user via API route
  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ User created successfully!');
      setEmail('');
      setPassword('');
      fetchUsers();
    } else {
      alert('❌ Error: ' + data.error);
    }
  }

  if (loading) return <p>Loading users...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>SuperAdmin - User Management</h1>

      {/* Create User Form */}
      <form onSubmit={handleCreateUser} style={{ marginBottom: '20px' }}>
        <input
          type="email"
          placeholder="User Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="User Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>

      {/* User List */}
      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ background: '#900f0f', color: 'white' }}>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
