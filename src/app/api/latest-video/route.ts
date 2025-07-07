// src/app/api/latest-playlist-video/route.ts
import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyDlkfKOFRULXjw1R0q6JwGtgXimDPpWZYE';
const PLAYLIST_ID = 'PLDyNzXGx4-hV5khEHBhT883FV0FPx3FmV';

export async function GET() {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=1&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'No videos found in playlist' }, { status: 404 });
    }

    const latest = data.items[0];
    const videoId = latest.snippet.resourceId.videoId;
    const title = latest.snippet.title;
    const thumbnail = latest.snippet.thumbnails?.medium?.url || '';

    return NextResponse.json({ videoId, title, thumbnail });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch playlist video' }, { status: 500 });
  }
}
