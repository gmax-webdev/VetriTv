'use client';
import React, { useEffect, useState } from 'react';
import './LocalAndPoliticalNews.css';

const POLITICAL_NEWS_API = '/api/political-news';

const PoliticalNews = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(POLITICAL_NEWS_API)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching political news:', err));
  }, []);

  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <div className="news-section right-news">
      <h2 className="section-title">Political News</h2>
      <div className="main-feature">
        <img src={main.image_url} alt={main.title} />
        <h3>{main.title}</h3>
      </div>
      <div className="sub-grid">
        {rest.map(post => (
          <div key={post.id} className="sub-post">
            <img src={post.featured_image} alt={post.title} />
            <p>{post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PoliticalNews;
