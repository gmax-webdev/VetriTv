'use client';

import React, { useEffect, useState } from 'react';
import he from 'he'; // ✅ Import this
import './LatestVideo.css'; 

interface VideoData {
  videoId: string;
  title: string;
  thumbnail: string;
}

const LatestVideo = () => {
  const [video, setVideo] = useState<VideoData | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch('/api/latest-video');
      const data = await res.json();
      if (data.videoId) {
        setVideo(data);
      }
    };
    fetchVideo();
  }, []);

  if (!video) return null;

  return (
    <div className="latest-video-section">
      <div className="video-thumbnail">
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-title-container">
        <div className="orange-bar"></div>
        <h2 className="video-title">{he.decode(video.title)}</h2> {/* ✅ Decode title */}
      </div>
    </div>
  );
};

export default LatestVideo;
