'use client';

import React, { useEffect, useState } from 'react';
import './LatestNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
}

const LatestNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/latest-news')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching latest news:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading latest news...</p>;

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      <div className="latest-news-list">
        {posts.length === 0 && <p>No latest news found.</p>}
        {posts.map((post) => {
            const postUrl = `https://vettritv.lk/${post.slug}`;
          return (
            <a
              key={post.id}
              href={postUrl}
              className="latest-news-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <p>{post.title}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default LatestNews;
