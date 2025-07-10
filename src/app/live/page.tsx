'use client';

import React, { useEffect, useState } from 'react';

export default function LivePage() {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLiveVideo() {
      const res = await fetch('/api/live-video');
      const data = await res.json();
      if (data.liveVideoId) {
        setVideoId(data.liveVideoId);
      }
    }

    fetchLiveVideo();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🔴 Live </h2>
      {videoId ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Vettri TV Live"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p>No live stream is currently active.</p>
      )}
    </div>
  );
}
