'use client';

import React, { useEffect, useState } from 'react';
import he from 'he'; // ✅ Import he to decode HTML entities
import './LatestNews.css';

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const LatestNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('https://vettritv.lk/wp-json/wp/v2/posts?_embed&per_page=10')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching latest news:', err));
  }, []);

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      {posts.length > 0 && (
        <div className="latest-news-list">
          {posts.slice(0, 4).map((post, index) => {
            const imageUrl =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? '';

            if (index === 0) {
              // First: big image with headline
              return (
                <div className="latest-news-featured" key={post.id}>
                  <img src={imageUrl} alt="News" />
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <h3>{he.decode(post.title.rendered)}</h3>
                  </a>
                </div>
              );
            } else if (index <= 2) {
              // Next two: side-by-side image + title
              return (
                <div className="latest-news-thumb" key={post.id}>
                  <img src={imageUrl} alt="News" />
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <p>{he.decode(post.title.rendered)}</p>
                  </a>
                </div>
              );
            } else {
              // Rest: only title
              return (
                <div className="latest-news-text" key={post.id}>
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    <p>{he.decode(post.title.rendered)}</p>
                  </a>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default LatestNews;
