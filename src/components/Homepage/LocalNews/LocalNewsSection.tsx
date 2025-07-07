'use client';

import React, { useEffect, useState } from 'react';
import './LocalNewsSection.css';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  _embedded: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

const LocalNewsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch(
        'https://vettritv.lk/wp-json/wp/v2/posts?_embed&categories=79&per_page=5'
      );
      const data = await res.json();
      setPosts(data);
    };

    fetchNews();
  }, []);

  if (posts.length === 0) return null;

  const mainPost = posts[0];
  const sidePosts = posts.slice(1);

  return (
    <div className="news-section">
      <h2 className="section-title"><span className="orange-dot" />Local News</h2>
      <div className="main-story">
        <img
          src={mainPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
          alt="Main news"
        />
        <a href={mainPost.link} target="_blank" rel="noopener noreferrer">
          <h3 dangerouslySetInnerHTML={{ __html: mainPost.title.rendered }} />
        </a>
        <p dangerouslySetInnerHTML={{ __html: mainPost.excerpt.rendered }} />
      </div>

      <div className="side-stories">
        {sidePosts.map((post) => (
          <a
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mini-story"
          >
            <img
              src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''}
              alt="thumb"
            />
            <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          </a>
        ))}
      </div>

      <a href="/local-news" className="see-all">See full coverage</a>
    </div>
  );
};

export default LocalNewsSection;
