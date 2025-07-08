'use client';
import React, { useEffect, useState } from 'react';
import './LocalAndPoliticalNews.css';

const LOCAL_NEWS_API = 'https://vettritv.lk/wp-json/wp/v2/posts?categories=204&_embed&per_page=4';

const LocalNews = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(LOCAL_NEWS_API)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching local news:', err));
  }, []);

  if (!posts.length) return null;

  const [main, ...rest] = posts;

  return (
    <div className="news-section left-news">
      <h2 className="section-title">Local News</h2>
      <div className="main-feature">
        <img src={main._embedded['wp:featuredmedia']?.[0]?.source_url} alt={main.title.rendered} />
        <h3 dangerouslySetInnerHTML={{ __html: main.title.rendered }} />
      </div>
      <div className="sub-grid">
        {rest.map(post => (
          <div key={post.id} className="sub-post">
            <img src={post._embedded['wp:featuredmedia']?.[0]?.source_url} alt={post.title.rendered} />
            <p dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalNews;
