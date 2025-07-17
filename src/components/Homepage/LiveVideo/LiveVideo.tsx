'use client';

import React, { useEffect, useState } from 'react';

interface LiveVideo {
  videoId: string;
  title: string;
  thumbnail: string;
}

const LatestLiveVideo = () => {
  const [video, setVideo] = useState<LiveVideo | null>(null);

  useEffect(() => {
    const fetchLiveVideo = async () => {
      const res = await fetch('/api/latest-live');
      const data = await res.json();
      if (data.videoId) setVideo(data);
    };

    fetchLiveVideo();
  }, []);

  if (!video) return <p>No live or recent stream found.</p>;

  return (
    <div className="live-video">
      <h2>{video.title}</h2>
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${video.videoId}`}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default LatestLiveVideo;
