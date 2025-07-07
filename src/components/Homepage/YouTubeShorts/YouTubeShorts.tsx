'use client';

import React, { useEffect, useRef, useState } from 'react';
import './YouTubeShorts.css';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

const YouTubeShorts = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const res = await fetch('/api/youtube-shorts');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error('Error fetching shorts:', err);
      }
    };

    fetchShorts();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="shorts-wrapper">
      <h2 className="shorts-heading">
        <span className="highlight-bar" />
        WATCH LATEST SHORTS
      </h2>

      <div className="shorts-container">
        <button className="scroll-arrow left" onClick={scrollLeft}>&lt;</button>

        <div className="shorts-scroll" ref={scrollRef}>
        {videos.slice(0, 10).map((video) => (
            <a
              key={video.id}
              href={`https://www.youtube.com/shorts/${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="short-card"
            >
              <div className="short-thumbnail-wrapper">
                <img src={video.thumbnail} alt={video.title} className="short-thumbnail" />
                <div className="short-overlay" />
                <p className="short-title">{video.title}</p>
              </div>
            </a>
          ))}
        </div>

        <button className="scroll-arrow right" onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
};

export default YouTubeShorts;
