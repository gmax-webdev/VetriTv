'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = `${username}@vettritv.lk`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage('❌ ' + error.message);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user?.id,
        username,
        role: 'admin',
      },
    ]);

    if (profileError) {
      setMessage('❌ ' + profileError.message);
    } else {
      setMessage(`✅ Admin '${username}' created successfully`);
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create Admin</button>
      {message && <p>{message}</p>}
    </form>
  );
}
