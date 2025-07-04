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
      console.log("📺 Latest video data:", data);
      if (data.videoId) {
        setVideoId(data.videoId);
        setTitle(data.title);
      }
    };

    fetchVideo();
  }, []);

  return (
    <div className="video-feature">
      <h2>{title}</h2>
      {videoId && (
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Latest Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default LatestVideo;
