'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './CinemaNews.css';
import { supabase } from '@/lib/supabaseClient';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
}

const CinemaNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchCinemaNews = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, slug, featured_image')
        .eq('category', 'சினிமா')
        .order('created_at', { ascending: false })
        .limit(9);

      if (error) {
        console.error('Cinema fetch error:', error);
        return;
      }

      const validPosts = data.filter(post => post.title && post.featured_image);
      setPosts(validPosts);
    };

    fetchCinemaNews();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="cinema-section">
      <div className="cinema-header">
        <h2 className="cinema-heading">சினிமா செய்திகள்</h2>
        <div className="cinema-divider"></div>
      </div>

      <div className="cinema-grid">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.id}`} // ✅ Internal link now
            className="cinema-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="cinema-page-img" />
            )}
            <div className="cinema-content">
              <h3 className="cinema-title">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CinemaNews;
