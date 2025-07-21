'use client';

import React, { useEffect, useState } from 'react';
import './MainNewsVideos.css';

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
}

const MainNewsVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/main-news');
        const data = await res.json();

        // Defensive: Only set videos if it's a valid array
        if (data && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          setVideos([]);
        }
      } catch (error) {
        console.error('Failed to load Main News videos');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p>Loading Main News...</p>;
  if (!videos || videos.length === 0) return <p>No Main News videos found.</p>;

  return (
    <div className="main-news-container">
      {/* <h2>Main News</h2> */}
      <div className="main-news-grid">
        {videos.map((video) => (
          <a
            key={video.videoId}
            href={`https://www.youtube.com/watch?v=${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
          >
            <img src={video.thumbnail} alt={video.title} className="thumbnail" />
            <h3 className="video-title">{video.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MainNewsVideos;
