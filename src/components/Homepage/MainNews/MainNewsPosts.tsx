'use client';
import React, { useEffect, useState } from 'react';
import './MainNewsPosts.css';

const API_URL =
  'https://vettritv.lk/wp-json/wp/v2/posts?categories=517&_embed&per_page=12';

export default function MainNewsPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Failed to fetch Main News:', err));
  }, []);

  return (
    <div className="main-news-grid">
      {posts.length === 0 ? (
        <p>No main news available.</p>
      ) : (
        posts.map((post: any) => (
          <div key={post.id} className="main-news-card">
            <img
              src={
                post._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
                '/Assets/default-image.jpg'
              }
              alt="Main News"
              className="main-news-image"
            />
            <h2
              className="main-news-title"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </div>
        ))
      )}
    </div>
  );
}
