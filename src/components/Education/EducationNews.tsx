'use client';

import React, { useEffect, useState } from 'react';
import './EducationNews.css';

interface Post {
  id: number;
  title: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const API_URL =
  'https://vettritv.lk/wp-json/wp/v2/posts?categories=218&_embed&per_page=20';
// 🔁 Replace 218 with the actual category ID for கல்வி (Education)

const EducationNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error loading education news:', err));
  }, []);

  return (
    <section className="education-news-grid">
      {posts.map((post) => (
        <div key={post.id} className="edu-news-card">
          <img
            className="edu-news-image"
            src={
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
              '/Assets/default-image.jpg'
            }
            alt="Education News"
          />
          <h2
            className="edu-news-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      ))}
    </section>
  );
};

export default EducationNews;
