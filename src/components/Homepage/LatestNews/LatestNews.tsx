'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // ✅ Import Link
import './LatestNews.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
}

const LatestNews: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/latest-news')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching latest news:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading latest news...</p>;

  return (
    <div className="latest-news">
      <h2>Latest News</h2>
      <div className="latest-news-list">
        {posts.length === 0 && <p>No latest news found.</p>}
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/news/${post.id}`} // ✅ Internal link
            className="latest-news-item"
          >
            {post.featured_image ? (
              <img src={post.featured_image} alt={post.title} />
            ) : (
              <div className="no-image">No Image</div>
            )}
            <p>{post.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
