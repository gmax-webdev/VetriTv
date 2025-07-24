'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './login.css'; // Your custom styles

export default function LoginPage() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState(''); // User full name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('updater'); // Default role
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignup) {
      // SIGN UP FLOW
      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name, // Store full name in user_metadata
              role, // Store role in user_metadata
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          return;
        }

         const user = data.user;
    if (user) {
      // ✅ Store name into profiles table
      await supabase.from('profiles').insert([
        {
          id: user.id,
          name: name,
        },
      ]);
    }

        // Signup successful, redirect based on role
        if (role === 'admin') {
          router.push('/superadmin/dashboard');
        } else {
          router.push('/admin/dashboard');
        }
      } catch (error: any) {
        setError(error.message || 'Signup failed');
      }
    } else {
      // LOGIN FLOW
      try {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) {
          setError(loginError.message);
          return;
        }

        const userRole = data.user?.user_metadata?.role;

        if (userRole === 'admin') {
          router.push('/superadmin/dashboard');
        } else if (userRole === 'updater') {
          router.push('/admin/dashboard');
        } else {
          setError('Unauthorized role');
        }
      } catch (error: any) {
        setError(error.message || 'Login failed');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>{isSignup ? 'Sign Up' : 'Log In'} to Vettri TV</h2>

        {isSignup && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          minLength={6}
        />

        {isSignup && (
          <select value={role} onChange={e => setRole(e.target.value)} required>
            <option value="updater">News Updater</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>

        <p className="toggle">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setError('');
              setIsSignup(!isSignup);
            }}
            className="toggle-btn"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}
