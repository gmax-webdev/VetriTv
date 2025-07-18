'use client';
import React, { useEffect, useState } from 'react';
import './SportsSection.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string;
}

const SPORTS_API = '/api/sports-news';

  function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

const SportsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(SPORTS_API)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
      .catch(err => console.error('Error fetching sports posts:', err));
  }, []);

  if (posts.length === 0) return null;

  const [mainPost, ...sidePosts] = posts;

  return (
    <div className="sports-wrapper">
      <div className="sports-banner-wrapper">
        <img src="/Assets/sports.jpg" alt="Sports Banner" className="sports-banner" />
        <div className="sports-label">
          <span className="orange-bar" />
          <span>Sport</span>
        </div>
      </div>

      <div className="sports-section">
        <div className="sports-left">
          <img src={mainPost.featured_image} alt="Main Sport" />
          <h3>{mainPost.title}</h3>
         <p className="excerpt">{stripHtml(mainPost.excerpt)}</p>

        </div>

        <div className="sports-right">
          {sidePosts.map(post => (
            <div className="sports-right-item" key={post.id}>
              <img src={post.featured_image} alt="Side Sport" />
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sports-footer">
        <a
          href="https://vettritv.lk/category/sports/"
          target="_blank"
          rel="noopener noreferrer"
        >
          See full coverage
        </a>
      </div>
    </div>
  );
};

export default SportsSection;
