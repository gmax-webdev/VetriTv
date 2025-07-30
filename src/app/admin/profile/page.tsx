'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './Profile.css';
import { toast } from 'react-hot-toast';

interface Profile {
  username: string;
  first_name?: string;
  last_name?: string;
  nickname: string;
  display_name?: string;
  website?: string;
  bio?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    username: '',
    first_name: '',
    last_name: '',
    nickname: '',
    display_name: '',
    website: '',
    bio: '',
  });

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gravatarHash, setGravatarHash] = useState('');

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email ?? '');

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data) setProfile(data);
        if (error) toast.error('Error loading profile');
      }
      setLoading(false);
    }

    loadData();
  }, []);

  useEffect(() => {
    async function generateHash() {
      const encoder = new TextEncoder();
      const data = encoder.encode(email.trim().toLowerCase());
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setGravatarHash(hashHex);
    }

    if (email) generateHash();
  }, [email]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error('User not found');
      setSaving(false);
      return;
    }

    // Update profile
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ ...profile, updated_at: new Date().toISOString() })
      .eq('id', user.id);

    if (profileError) {
      toast.error('Error saving profile');
      setSaving(false);
      return;
    }

    // Email update
    if (email !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email });
      if (emailError) {
        toast.error('Email update failed: ' + emailError.message);
      } else {
        toast.success('Email update request sent');
      }
    }

    // Password update
    if (newPassword.length > 5) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });
      if (passwordError) {
        toast.error('Password update failed: ' + passwordError.message);
      } else {
        toast.success('Password updated');
      }
    }

    toast.success('Profile updated!');
    setSaving(false);
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
      <h2>Edit Your Profile</h2>
      <div className="gravatar-section">
        <p><strong>Profile Picture:</strong></p>
        <img
          src={`https://www.gravatar.com/avatar/${gravatarHash}?s=100&d=identicon`}
          alt="Gravatar"
          width={100}
          height={100}
        />
        <p><a href="https://gravatar.com" target="_blank" rel="noreferrer">Change on Gravatar</a></p>
      </div>

      <div className="profile-form">
        <label>Username (cannot be changed)</label>
        <input type="text" value={profile.username} disabled />

        <label>First Name</label>
        <input
          type="text"
          value={profile.first_name || ''}
          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
        />

        <label>Last Name</label>
        <input
          type="text"
          value={profile.last_name || ''}
          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
        />

        <label>Nickname (required)</label>
        <input
          type="text"
          value={profile.nickname}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
        />

        <label>Display name publicly as</label>
        <input
          type="text"
          value={profile.display_name || ''}
          onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
        />

        <label>Email (required)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <small>If you change this, you will receive a confirmation email.</small>

        <label>Website</label>
        <input
          type="text"
          value={profile.website || ''}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
        />

        <label>Biographical Info</label>
        <textarea
          rows={4}
          value={profile.bio || ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        ></textarea>

        <label>New Password</label>
        <input
          type="password"
          placeholder="Set new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </div>
  );
}
