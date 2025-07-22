'use client';

import React, { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
  postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const [form, setForm] = useState({ name: '', email: '', website: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Replace this with your actual API call to save comment in Supabase or backend
      // Example: await fetch('/api/comments', { method: 'POST', body: JSON.stringify({...}) })

      // Simulate API delay
      await new Promise((r) => setTimeout(r, 1000));

      setStatus('success');
      setForm({ name: '', email: '', website: '', comment: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="comment-form-wrapper">
      <h3>Leave a Reply</h3>
      <p>Your email address will not be published. Required fields are marked *</p>

      <form className="comment-form" onSubmit={handleSubmit}>
        <label>
          Comment *<br />
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            required
            rows={4}
          />
        </label>

        <label>
          Name *<br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email *<br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Website<br />
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
          />
        </label>

        <label className="save-info">
          <input type="checkbox" />
          Save my name, email, and website in this browser for the next time I comment.
        </label>

        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting...' : 'Post Comment'}
        </button>

        {status === 'success' && <p className="success-msg">Thank you! Your comment has been submitted.</p>}
        {status === 'error' && <p className="error-msg">Oops! Something went wrong.</p>}
      </form>
    </div>
  );
}
