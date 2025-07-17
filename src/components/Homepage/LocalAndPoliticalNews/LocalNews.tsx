'use client';

import React, { useEffect, useState } from 'react';
import './LocalAndPoliticalNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string;
  category: string;
}

const LocalNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/local-news')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching local news:', err));
  }, []);

  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <div className="news-section left-news">
      <h2 className="section-title">Local News</h2>
      <div className="main-feature">
        {main.featured_image ? (
          <img src={main.featured_image} alt={main.title} />
        ) : (
          <div className="no-image-placeholder">No Image</div>
        )}
        <h3>{main.title}</h3>
      </div>
      <div className="sub-grid">
        {rest.map(post => (
          <div key={post.id} className="sub-post">
            {post.featured_image ? (
              <img src={post.featured_image} alt={post.title} />
            ) : (
              <div className="no-image-placeholder">No Image</div>
            )}
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNews;
