'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './EditProfileForm.css';

export default function EditProfileForm() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (!error) setProfile({ ...data, email: user.email, username: user.user_metadata.username });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const updates = {
      id: profile.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      nickname: profile.nickname,
      display_name: profile.display_name,
      website: profile.website,
      bio: profile.bio,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);
    if (error) {
      setMessage('Error updating profile');
    } else {
      setMessage('Profile updated successfully');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form className="edit-profile-form" onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <div className="form-group">
        <label>Username</label>
        <input type="text" value={profile.username} disabled />
        <small>Usernames cannot be changed.</small>
      </div>

      <div className="form-group">
        <label>First Name</label>
        <input name="first_name" value={profile.first_name || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <input name="last_name" value={profile.last_name || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Nickname <span>*</span></label>
        <input name="nickname" value={profile.nickname || ''} required onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Display name publicly as</label>
        <input name="display_name" value={profile.display_name || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Email <span>*</span></label>
        <input type="email" name="email" value={profile.email || ''} disabled />
        <small>If you change this, an email will be sent to confirm it.</small>
      </div>

      <div className="form-group">
        <label>Website</label>
        <input name="website" value={profile.website || ''} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>Biographical Info</label>
        <textarea name="bio" rows={4} value={profile.bio || ''} onChange={handleChange} />
      </div>

      <button type="submit">Save Profile</button>

      {message && <p className="message">{message}</p>}
    </form>
  );
}
