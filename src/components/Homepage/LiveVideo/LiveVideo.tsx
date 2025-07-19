'use client';

import React, { useEffect, useState } from 'react';
import './LiveVideo.css';

interface Video {
  videoId: string;
  title: string;
  thumbnail: string;
}

interface ResponseData {
  latest: Video;
  others: Video[];
}

const LiveVideo: React.FC = () => {
  const [latestVideo, setLatestVideo] = useState<Video | null>(null);
  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/live-video')
      .then((res) => res.json())
      .then((data: ResponseData) => {
        setLatestVideo(data.latest);
        setRecentVideos(data.others);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching live videos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="live-video">Loading...</div>;
  if (!latestVideo) return <div className="live-video">No video available.</div>;

  return (
    <div className="live-video-wrapper">
      <div className="main-video">
        <div className="video-player">
          <iframe
            src={`https://www.youtube.com/embed/${latestVideo.videoId}`}
            title={latestVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <h2 className="video-title">{latestVideo.title}</h2>
      </div>

      <div className="recent-videos">
        <h3 className="recent-title">More Recent videos</h3>
        <ul className="video-list">
          {recentVideos.map((video) => (
            <li key={video.videoId} className="video-list-item">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={video.thumbnail} alt={video.title} className="video-thumb" />
                <div className="video-meta">
                  <p className="video-meta-title">{video.title}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LiveVideo;
