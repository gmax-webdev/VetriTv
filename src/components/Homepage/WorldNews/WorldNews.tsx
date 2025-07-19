'use client';

import React, { useEffect, useState } from 'react';
import './WorldNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
}

const WorldNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/world-news')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching world news:', err));
  }, []);

  return (
    <div className="world-news">
      <h2>World News</h2>
      <div className="world-news-list">
        {posts.length === 0 && <p>No world news found.</p>}
        {posts.map(post => {
          const postUrl = `https://vettritv.lk/${post.slug}`;
          return (
            <a
              href={postUrl}
              key={post.id}
              className="world-news-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}
              <p>{post.title}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default WorldNews;
