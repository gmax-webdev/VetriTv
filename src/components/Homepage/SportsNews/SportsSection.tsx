'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // <-- Import Link here
import './SportsSection.css';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
}

const SPORTS_API = '/api/sports-news';

function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}


const SportsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(SPORTS_API)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching sports posts:', err));
  }, []);

 if (!Array.isArray(posts) || posts.length === 0) return null;

 const [mainPost, ...sidePosts] = posts;


  return (
    <div className="sports-wrapper">
      {/* Banner */}
      <div className="sports-banner-wrapper">
        <img
          src="/Assets/sports.jpg"
          alt="Sports Banner"
          className="sports-banner"
        />
        <div className="sports-label">
          <span className="orange-bar" />
          <span>Sport</span>
        </div>
      </div>

      {/* Floating Content Card */}
      <div className="sports-content-card">
        <div className="sports-section">
          {/* Left Side - Main Post */}
          <div className="sports-left">
            <img src={mainPost.featured_image} alt="Main Sport" />
            <h3>
              <Link href={`/news/${mainPost.id}`} className="main-post-link">
                {mainPost.title}
              </Link>
            </h3>
            <p className="excerpt">{stripHtml(mainPost.excerpt)}</p>
          </div>

          {/* Right Side - Small Posts */}
          <div className="sports-right">
            {sidePosts.map((post) => (
              <div className="sports-right-item" key={post.id}>
                <img src={post.featured_image} alt={post.title} />
                <p>
                  <Link href={`/news/${post.id}`} className="side-post-link">
                    {post.title}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom link */}
        <div className="sports-footer">
          <Link href="/category/sports" className="full-coverage-link">
            See full coverage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SportsSection;
