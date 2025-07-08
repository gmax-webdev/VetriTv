// src/app/api/latest-video/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const FEED_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCHK8XG0Jn257CC6TQSkq_Rw';

  try {
    const res = await fetch(FEED_URL);
    const xml = await res.text();

    const videoIdMatch = xml.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
    const titleMatch = xml.match(/<title>(.*?)<\/title>/g);
    const thumbnailMatch = xml.match(/<media:thumbnail url="(.*?)"/);

    if (!videoIdMatch || !titleMatch || !thumbnailMatch) {
      return NextResponse.json({ error: 'Failed to parse video data' }, { status: 500 });
    }

    const videoId = videoIdMatch[1];
    const title = titleMatch[1].replace(/<\/?title>/g, ''); // second <title> is the video title
    const thumbnail = thumbnailMatch[1];

    return NextResponse.json({ videoId, title, thumbnail });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}
