import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw';
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=6&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ message: 'No videos found' }, { status: 404 });
    }

    const videos = data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    return NextResponse.json({ latest: videos[0], others: videos.slice(1) });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
