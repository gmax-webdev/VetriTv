'use client';

import React, { useEffect, useState } from 'react';
import he from 'he';
import './LiveUpdates.css';

interface Update {
  timeAgo: string;
  message: string;
}

const LiveUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    fetch('https://vettritv.lk/wp-json/wp/v2/posts?categories=54&per_page=10') // 🔁 Fetch latest 10 updates
      .then(res => res.json())
      .then(data => {
        const liveItems: Update[] = data.map((item: any) => ({
          timeAgo: getTimeAgo(item.date),
          message: stripHTML(he.decode(item.title.rendered)),
        }));
        setUpdates(liveItems);
      })
      .catch(err => console.error('Error fetching live updates:', err));
  }, []);

  const getTimeAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - postDate.getTime()) / 60000); // minutes

    if (diff < 1) return 'Just now';
    if (diff === 1) return '1m ago';
    if (diff < 60) return `${diff}m ago`;

    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const stripHTML = (html: string) => {
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="live-updates-section">
      <h3 className="live-title">
        <span className="live-icon">🔴</span> LIVE UPDATES
      </h3>
      <ul className="updates-list">
        {updates.map((item, idx) => (
          <li key={idx}>
            <span className="dot"></span>
            <span className="time">{item.timeAgo}</span>
            <span className="message">{item.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveUpdates;
