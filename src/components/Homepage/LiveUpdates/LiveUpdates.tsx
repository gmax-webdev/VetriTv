'use client';

import React, { useEffect, useState } from 'react';
import he from 'he';
import './LiveUpdates.css';

interface Update {
  id: number;
  timeAgo: string;
  message: string;
  link: string;
  date: string;
}

const LiveUpdates = () => {
  const [allUpdates, setAllUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://vettritv.lk/wp-json/wp/v2/posts?_embed&per_page=30')
      .then(res => res.json())
      .then((data: any[]) => {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        const updates = data
          .filter(post => {
            const postDateStr = new Date(post.date).toISOString().split('T')[0];
            return postDateStr === todayStr;
          })
          .map(post => ({
            id: post.id,
            timeAgo: getTimeAgo(post.date),
            message: stripHTML(he.decode(post.title.rendered)),
            link: post.link,
            date: post.date,
          }));

        setAllUpdates(updates);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching updates:', err);
        setLoading(false);
      });
  }, []);

  const getTimeAgo = (dateString: string): string => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now.getTime() - postDate.getTime();
    const minutes = Math.floor(diffMs / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const stripHTML = (html: string): string => {
    return html.replace(/<[^>]*>/g, '');
  };

  const visibleUpdates = showAll ? allUpdates : allUpdates.slice(0, 5);

  return (
    <div className="live-updates-section">
      <h3 className="live-title">
        <span className="live-icon">🟢</span> LIVE UPDATES (Today)
      </h3>

      {loading ? (
        <p>Loading updates...</p>
      ) : allUpdates.length === 0 ? (
        <p>No live updates today.</p>
      ) : (
        <>
          <ul className="updates-list">
            {visibleUpdates.map(update => (
              <li key={update.id}>
                <span className="time">{update.timeAgo}</span>
                <a
                  href={update.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="message"
                >
                  {update.message}
                </a>
              </li>
            ))}
          </ul>

          {allUpdates.length > 5 && (
            <button className="see-all-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show Less' : 'See All Updates'}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LiveUpdates;
