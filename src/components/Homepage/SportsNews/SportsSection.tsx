'use client';
import React, { useEffect, useState } from 'react';
import './SportsSection.css';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  jetpack_featured_media_url: string;
  link: string;
}

const SPORTS_API = 'https://vettritv.lk/wp-json/wp/v2/posts?categories=208&per_page=5&_embed';

const SportsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(SPORTS_API)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching sports posts:', err));
  }, []);

  if (posts.length === 0) return null;

  const [mainPost, ...otherPosts] = posts;

  return (
    <div className="sports-section">
      <div className="sports-header">
        <img
          src="https://example.com/sports-banner.jpg" // Replace with your real image URL
          alt="Sports banner"
          className="sports-banner"
        />
        <div className="sports-label">
          <span className="orange-bar" /> Sport
        </div>
      </div>

      <div className="sports-content">
        <div className="main-sports-article">
          <img src={mainPost.jetpack_featured_media_url} alt="main" />
          <h3 dangerouslySetInnerHTML={{ __html: mainPost.title.rendered }} />
          <p dangerouslySetInnerHTML={{ __html: mainPost.excerpt.rendered }} />
        </div>

        <div className="sports-side-articles">
          {otherPosts.map(post => (
            <div key={post.id} className="side-article">
              <img src={post.jetpack_featured_media_url} alt="thumb" />
              <p dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </div>
          ))}
        </div>

        <div className="full-coverage">
          <a href="https://vettritv.lk/category/sports/" target="_blank" rel="noopener noreferrer">
            See full coverage
          </a>
        </div>
      </div>
    </div>
  );
};

export default SportsSection;
