'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './SuperAdminLogin.css';

export default function SuperAdminLoginPage() {
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // On mount, check if user is already logged in and is super_admin
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        // Fetch profile role from 'profiles' table
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          return;
        }

        if (profile?.role === 'super_admin') {
          router.push('/superadmin/dashboard');
        }
      }
    };
    checkSession();
  }, [router]);

  const handleSubmit = async () => {
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Email and password are required');
      return;
    }

    if (isSignup) {
      // SIGN UP flow
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const user = data.user;
      if (user) {
        // Create profile in 'profiles' table with role super_admin
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: user.id,
          email: user.email,
          role: 'super_admin',
        });

        if (profileError) {
          setErrorMsg(profileError.message);
          return;
        }
      }

      alert('Signup successful! Please check your email to confirm before logging in.');
      setIsSignup(false); // Switch to login mode after signup
    } else {
      // LOGIN flow
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        setErrorMsg('Login failed');
        return;
      }

      // Fetch user profile role
      const { data: profile, error: roleError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (roleError) {
        console.error('Profile fetch error:', roleError);
        await supabase.auth.signOut();
        setErrorMsg('Access Denied: Unable to verify user role.');
        return;
      }

      if (profile?.role !== 'super_admin') {
        await supabase.auth.signOut();
        setErrorMsg('Access Denied: Not a Super Admin');
        return;
      }

      // Success! Redirect to dashboard
      router.push('/superadmin/dashboard');
    }
  };

  return (
    <div className="superadmin-login-container">
      <div className="login-box">
        <h2>{isSignup ? 'Super Admin Sign Up' : 'Super Admin Login'}</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete={isSignup ? 'new-password' : 'current-password'}
        />

        <button onClick={handleSubmit}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            onClick={() => {
              setErrorMsg('');
              setIsSignup(!isSignup);
            }}
            style={{ cursor: 'pointer', color: '#0070f3' }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
