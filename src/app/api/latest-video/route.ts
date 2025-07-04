// src/app/api/latest-video/route.ts
import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyDlkfKOFRULXjw1R0q6JwGtgXimDPpWZYE';
const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw';

export async function GET() {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'No videos found' });
    }

    const latestVideo = data.items[0];
    const videoId = latestVideo.id.videoId;
    const title = latestVideo.snippet.title;

    return NextResponse.json({ videoId, title });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' });
  }
}
