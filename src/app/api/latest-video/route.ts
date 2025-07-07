// src/app/api/latest-video/route.ts
import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw';

export async function GET() {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  try {
    const res = await fetch(url);
    const xmlText = await res.text();

    const videoIdMatch = xmlText.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = xmlText.match(/<title>(.*?)<\/title>/g);

    if (!videoIdMatch || !titleMatch || titleMatch.length < 2) {
      return NextResponse.json({ error: 'No valid video found' }, { status: 404 });
    }

    const videoId = videoIdMatch[1];
    const title = titleMatch[1].replace(/<\/?title>/g, '');
   
    return NextResponse.json({ videoId, title });
  } catch (error) {
    console.error('Error fetching latest video:', error);
    return NextResponse.json({ error: 'Failed to fetch latest video' }, { status: 500 });
  }
}
