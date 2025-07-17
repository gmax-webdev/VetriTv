'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './LocalAndPoliticalNews.css';

// Supabase Config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local News category ID
const LOCAL_CATEGORY_ID = 204;

interface Post {
  id: number;
  title: string;
  image_url: string;
  category_id: number;
  created_at: string;
}

const LocalNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchLocalNews = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, image_url, category_id, created_at')
        .eq('category_id', LOCAL_CATEGORY_ID)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) {
        console.error('Supabase fetch error:', error.message);
        console.log('✅ Supabase Local News Response:', data);

      } else {
        setPosts(data || []);
      }
    };

    fetchLocalNews();
  }, []);

  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <div className="news-section left-news">
      <h2 className="section-title">Local News</h2>

      <div className="main-feature">
        <img src={main.image_url} alt={main.title} />
        <h3>{main.title}</h3>
      </div>

      <div className="sub-grid">
        {rest.map((post) => (
          <div key={post.id} className="sub-post">
            <img src={post.image_url} alt={post.title} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNews;
