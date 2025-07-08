'use client';

import React, { useEffect, useState } from 'react';
import './SportsNews.css';

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  _embedded: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const SPORTS_CATEGORY_ID = 203; // Replace with actual ID from vettritv.lk

const SportsNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`https://vettritv.lk/wp-json/wp/v2/posts?categories=${SPORTS_CATEGORY_ID}&_embed&per_page=5`);
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const subPosts = posts.slice(1);

  const getImage = (post: Post) =>
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '/Assets/placeholder.jpg';

  return (
    <div className="sports-news-wrapper">
      <h3 className="sports-section-title">Sports</h3>

      <div className="sports-main">
        <img src={getImage(mainPost)} alt="Main" className="sports-main-image" />
        <h2 className="sports-main-title">
          <a href={mainPost.link} target="_blank" rel="noopener noreferrer">
            {mainPost.title.rendered}
          </a>
        </h2>
      </div>

      <div className="sports-sub-grid">
        {subPosts.map((post) => (
          <div key={post.id} className="sports-sub-item">
            <img src={getImage(post)} alt="Thumbnail" className="sports-sub-image" />
            <p className="sports-sub-title">
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                {post.title.rendered}
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsNews;
