'use client';

import React, { useEffect, useState } from 'react';
import './YouTubeShorts.css';

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
}

const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your real key
const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw';

const YouTubeShorts = () => {
  const [shorts, setShorts] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchShorts = async () => {
      try {
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&maxResults=20&order=date&type=video`
        );
        const searchData = await searchRes.json();
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

        const videoRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=contentDetails,snippet`
        );
        const videoData = await videoRes.json();

        const getDurationInSeconds = (duration: string): number => {
          const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
          const minutes = parseInt(match?.[1] || '0');
          const seconds = parseInt(match?.[2] || '0');
          return minutes * 60 + seconds;
        };

        const shortsOnly = videoData.items.filter((video: any) => {
          const seconds = getDurationInSeconds(video.contentDetails.duration);
          return seconds <= 60; // Only keep videos under 60s
        });

        const formatted = shortsOnly.map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
        }));

        setShorts(formatted);
      } catch (error) {
        console.error('Error fetching shorts:', error);
      }
    };

    fetchShorts();
  }, []);

  return (
    <div className="shorts-section">
      <h2><span className="highlight-bar" /> WATCH LATEST SHORTS</h2>
      <div className="shorts-container">
        {shorts.map((video) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/shorts/${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="short-card"
          >
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default YouTubeShorts;
