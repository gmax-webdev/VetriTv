'use client';

import React, { useEffect, useState } from 'react';
import './WorldNews.css';

interface Post {
  id: number;
  title: { rendered: string };
  link: string;
  _embedded?: {
    'wp:featuredmedia'?: { source_url: string }[];
  };
}

const WorldNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
  fetch('https://vettritv.lk/wp-json/wp/v2/posts?categories=204&_embed&per_page=4')
    .then(res => res.json())
    .then(data => setPosts(data))
    .catch(err => console.error('Error fetching world news:', err));
}, []);


  return (
    <div className="world-news">
      <h2>World News</h2>
      <div className="world-news-list">
        {posts.map(post => {
          const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
          return (
            <div className="world-news-item" key={post.id}>
              {img && <img src={img} alt="" />}
              <a href={post.link} target="_blank" rel="noopener noreferrer">
                <p>{post.title.rendered}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorldNews;
