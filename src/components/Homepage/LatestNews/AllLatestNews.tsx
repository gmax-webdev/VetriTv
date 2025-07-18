'use client';

import React, { useEffect, useState } from 'react';
import './AllLatestNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image?: string;
}

const AllLatestNews = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
  fetch('/api/all-latest-news')
    .then(res => res.json())
    .then(data => {
      // Filter posts to only those with a featured_image string and non-empty
      const filteredPosts = data.filter(
        (post: Post) => post.featured_image && post.featured_image.trim() !== ''
      );
      setPosts(filteredPosts);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error loading all latest news:', err);
      setLoading(false);
    });
}, []);


  if (loading) {
    return <p className="loading-text">Loading latest news...</p>;
  }

  if (!posts.length) {
    return <p className="no-news-text">No latest news found.</p>;
  }

  return (
    <section className="all-latest-news">
      {posts.map(post => (
        
        <div key={post.id} className="news-card">
          <a
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="news-img"
              src={post.featured_image || '/Assets/default-image.jpg'}
              alt={post.title}
            />
            <h2 className="news-title">{post.title}</h2>
          </a>
        </div>
      ))}
    </section>
  );
};

export default AllLatestNews;
