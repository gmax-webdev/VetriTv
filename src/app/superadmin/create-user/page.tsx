'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient'; // your supabase client instance
import './CreateUser.css'; // optional styling

export default function CreateUserPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateUser = async () => {
    setMessage('');

    if (!username || !email || !password) {
      setMessage('⚠ All fields are required');
      return;
    }

    try {
      // 1️⃣ Sign up user with Supabase Auth (password handled securely by Supabase)
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setMessage(`Auth Error: ${signUpError.message}`);
        return;
      }

      if (!data.user) {
        setMessage('User signup failed');
        return;
      }

      // 2️⃣ Insert user profile into profiles table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username,
        email,
        role: 'user', // default role — adjust as needed
      });

      if (profileError) {
        setMessage(`Profile Error: ${profileError.message}`);
        return;
      }

      setMessage('✅ User created successfully! Please check your email to confirm.');
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setMessage(`Unexpected Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="create-user-container">
      <h1>Create New User</h1>

      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          autoComplete="username"
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          autoComplete="email"
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          autoComplete="new-password"
        />
      </div>

      <button onClick={handleCreateUser}>Create User</button>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
