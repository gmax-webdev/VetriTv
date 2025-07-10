import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw'; // Your Vettri TV channel ID

export async function GET() {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    const xml = await res.text();

    // Match all entries
    const entries = [...xml.matchAll(/<entry>[\s\S]*?<\/entry>/g)];

    for (const entry of entries) {
      const block = entry[0];

      // Find <title> and <yt:videoId> inside this entry
      const titleMatch = block.match(/<title>(.*?)<\/title>/);
      const idMatch = block.match(/<yt:videoId>(.*?)<\/yt:videoId>/);

      if (titleMatch && idMatch) {
        const title = titleMatch[1];
        const videoId = idMatch[1];

        // If title contains 'live', treat it as live video
        if (title.toLowerCase().includes('live')) {
          return NextResponse.json({ liveVideoId: videoId });
        }
      }
    }

    return NextResponse.json({ liveVideoId: null }); // No live video found
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch feed' }, { status: 500 });
  }
}
