import { NextResponse } from 'next/server';

const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw'; // VettriTV Channel ID
const API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET() {
  try {
    // Step 1: Search for LIVE and COMPLETED streams (latest first)
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&maxResults=5&key=${API_KEY}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const videoIds = searchData.items?.map((item: any) => item.id.videoId).join(',');

    if (!videoIds) return NextResponse.json({ error: 'No videos found' });

    // Step 2: Get video details to filter livestreams
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds}&key=${API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();

    // Step 3: Find most recent LIVE or past livestream
    const liveVideo = videosData.items.find((video: any) =>
      video.snippet.liveBroadcastContent === 'live' || video.liveStreamingDetails
    );

    if (liveVideo) {
      return NextResponse.json({
        videoId: liveVideo.id,
        title: liveVideo.snippet.title,
        thumbnail: liveVideo.snippet.thumbnails.high.url,
      });
    }

    return NextResponse.json({ videoId: null });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch YouTube live video' }, { status: 500 });
  }
}
