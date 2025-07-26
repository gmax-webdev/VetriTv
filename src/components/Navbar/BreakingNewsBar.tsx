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

  const fetchBreakingNews = async () => {
    try {
      const res = await fetch('/api/breaking-news');
      const data = await res.json();

      if (Array.isArray(data)) {
        setNewsItems(data);
      } else {
        console.error('Breaking news API returned non-array:', data);
        setNewsItems([]);
      }
    } catch (error) {
      console.error('Error fetching breaking news:', error);
      setNewsItems([]);
    }
  };

  useEffect(() => {
    fetchBreakingNews();
    const interval = setInterval(fetchBreakingNews, 60000); // refresh every 1 min
    return () => clearInterval(interval);
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
            [...newsItems, ...newsItems, ...newsItems].map((item, index) => (
              <span key={`${item.id}-${index}`} className="ticker-item">
                🟡 {item.title} {' — '}
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
