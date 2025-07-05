'use client';

import React, { useEffect, useState } from 'react';
import './LatestVideo.css';

const LatestVideo = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch('/api/latest-video');
      const data = await res.json();
      if (data.videoId) {
        setVideoId(data.videoId);
        setTitle(data.title);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="latest-video-section">
      <div className="video-thumbnail">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Latest Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-title-container">
        <div className="orange-bar"></div>
        <h2 className="video-title">{title}</h2>
      </div>
    </div>
  );
};

export default LatestVideo;
