'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthForm() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    // 1. Sign up with email & password
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (!signUpData?.user) {
      setError('User data not returned from signup');
      setLoading(false);
      return;
    }

    // 2. Insert profile info (username, first_name, last_name) into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: signUpData.user.id,
      username,
      first_name: firstName,
      last_name: lastName,
    });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    // 3. Auto sign in is done by supabase, redirect to admin dashboard
    router.push('/admin/dashboard');
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push('/admin/dashboard');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>

      {isSignup && (
        <>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
      )}

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={isSignup ? handleSignup : handleLogin}
        disabled={loading}
        style={{ marginTop: 10 }}
      >
        {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
      </button>

      <p style={{ marginTop: 10 }}>
        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => {
            setError(null);
            setIsSignup(!isSignup);
          }}
          style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isSignup ? 'Login' : 'Sign Up'}
        </button>
      </p>
    </div>
  );
}
