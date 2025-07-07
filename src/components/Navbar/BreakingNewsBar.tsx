'use client';

import React, { useEffect, useState } from 'react';
import './BreakingNewsBar.css';

interface BreakingNewsItem {
  id: number;
  title: string;
  link: string;
}

const BreakingNewsBar = () => {
  const [newsItems, setNewsItems] = useState<BreakingNewsItem[]>([]);

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        const res = await fetch('/api/breaking-news');
        const data = await res.json();
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching breaking news:', error);
      }
    };

    fetchBreakingNews();
  }, []);

  return (
    <div className="breaking-wrapper">
      <div className="breaking-label">
        <span>BREAKING</span>
        <span className="news-text">NEWS</span>
      </div>
      <div className="breaking-ticker">
        <div className="ticker-content">
          {newsItems.length > 0 ? (
            newsItems.map((item, index) => (
              <span key={item.id}>
                🟡{' '}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                ></a>
                {index < newsItems.length - 1 && ' — '}
              </span>
            ))
          ) : (
            <span>🟡 No breaking news now. Stay tuned.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
