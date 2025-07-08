'use client';

import React, { useEffect, useState } from 'react';
import './AllLatestNews.css';

interface Post {
  id: number;
  title: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const API_URL = 'https://vettritv.lk/wp-json/wp/v2/posts?_embed&per_page=20';

const AllLatestNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error loading news:', err));
  }, []);

  return (
    <section className="all-latest-news">
      {posts.map(post => (
        <div key={post.id} className="news-card">
          <img
            className="news-img"
            src={
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url ??
              '/Assets/default-image.jpg'
            }
            alt="News"
          />
          <h2
            className="news-title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      ))}
    </section>
  );
};

export default AllLatestNews;
