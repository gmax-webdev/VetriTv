'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import './EntertainmentNewsSection.css';

interface Post {
  id: number;
  title: string;
  slug?: string;
  excerpt?: string;
  featured_image?: string;
  category: string;
  created_at: string;
}

export default function EntertainmentNewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .contains('category', ['மருத்துவம்'])   // Filter only medical news
        .order('created_at', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Supabase error:', error);
        setErrorMsg('Failed to load posts.');
        setLoading(false);
        return;
      }

      if (!data || data.length === 0) {
        setPosts([]);
        setLoading(false);
        return;
      }

      setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="entertainment-section">
        <h2 className="section-title">Entertainment News</h2>
        <p>Loading posts...</p>
      </section>
    );
  }

  if (errorMsg) {
    return (
      <section className="entertainment-section">
        <h2 className="section-title">Entertainment News</h2>
        <p style={{ color: 'red' }}>{errorMsg}</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="entertainment-section">
        <h2 className="section-title">Entertainment News</h2>
        <p>No posts found.</p>
      </section>
    );
  }

  return (
    <section className="entertainment-section">
      <h2 className="section-title">Entertainment News</h2>

      <div className="entertainment-featured-layout">
        {/* Big card */}
        <div className="large-card">
          <Link href={`/news/${posts[0].id}`}>
            <div className="category-label">{posts[0].category}</div>
            {posts[0].featured_image && (
              <img
                src={posts[0].featured_image}
                alt={posts[0].title}
                className="large-thumbnail"
              />
            )}
            <h3 className="large-title">{posts[0].title?.slice(0, 90)}</h3>
          </Link>
        </div>

        {/* Small cards */}
        <div className="small-cards-grid">
          {posts.slice(1).map((post) => (
            <div key={post.id} className="small-card">
              <Link href={`/news/${post.id}`}>
                <div className="category-label">{post.category}</div>
                {post.featured_image && (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="small-thumbnail"
                  />
                )}
                <h3 className="small-title">{post.title?.slice(0, 60)}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
