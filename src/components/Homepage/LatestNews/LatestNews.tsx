// src/components/Homepage/LatestNews/LatestNews.tsx

'use client';

import React, { useEffect, useState } from 'react';
import './LatestNews.css';

interface Post {
  id: number;
  title: string;
  image_url: string;
}

const LatestNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const res = await fetch('https://vettritv.lk/wp-json/wp/v2/posts?_embed');
        const data = await res.json();

        const formatted = data.map((post: any) => ({
          id: post.id,
          title: post.title.rendered,
          image_url:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/Assets/default.jpg',
        }));

        setPosts(formatted);
      } catch (err) {
        console.error('Failed to fetch latest news:', err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  return (
    <section className="latest-news-section">
      <h2>🕘 Latest News</h2>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="latest-news-grid">
          {posts.map((post) => (
            <div key={post.id} className="news-card">
              <img src={post.image_url} alt={post.title} />
              <h3>{post.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No latest news available.</p>
      )}
    </section>
  );
};

export default LatestNews;
