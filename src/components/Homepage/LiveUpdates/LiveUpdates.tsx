'use client';

import React, { useEffect, useState } from 'react';
import './LiveUpdates.css';

interface Update {
  timeAgo: string;
  message: string;
}

const LiveUpdates = () => {
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    // Replace this with your backend fetch
    setUpdates([
      { timeAgo: '3m ago', message: "If you're just joining us" },
      { timeAgo: '22m ago', message: 'WATCH: Mapping Israeli strikes on Iran’s air defences' },
      { timeAgo: '42m ago', message: 'Israeli military arrests two Palestinians during West Bank raid, settlers attack ambulance' },
      { timeAgo: '1h ago', message: 'Trump says Iran may restart nuclear programme in new locations' }
    ]);
  }, []);

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
