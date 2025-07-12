'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './LatestNews.css';

type Post = {
  id: number;
  title: string;
  content: string;
  featured_image: string;
  category: string;
  created_at: string;
};

export default function LatestNews() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(10);

      if (!error) {
        setPosts(data);
      } else {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="latest-news-section">
      <h2>🕘 Latest News</h2>
      <div className="latest-news-grid">
        {posts.map((post) => (
          <div key={post.id} className="news-card">
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="news-image" />
            )}
            <h3>{post.title}</h3>
            <p className="category">{post.category}</p>
            <p className="content">{post.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
