'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Import Next.js Link
import './LocalAndPoliticalNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string;
}

const PoliticalNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/political-news')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching political news:', err));
  }, []);

  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <div className="news-section">
      <h2 className="section-title">Political News</h2>

      <div className="main-feature">
        <div className="image-container">
          {main.featured_image ? (
            <img src={main.featured_image} alt={main.title} className="featured-image" />
          ) : (
            <div className="no-image-placeholder">No Image</div>
          )}
        </div>
        <h3 className="feature-title">
          <Link href={`/news/${main.id}`}>
            {main.title}
          </Link>
        </h3>
      </div>

      <div className="sub-grid">
        {rest.map(post => (
          <div key={post.id} className="sub-post">
            <div className="image-container">
              {post.featured_image ? (
                <img src={post.featured_image} alt={post.title} className="featured-image" />
              ) : (
                <div className="no-image-placeholder">No Image</div>
              )}
            </div>
            <p className="post-title">
              <Link href={`/news/${post.id}`}>
                {post.title}
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticalNews;
