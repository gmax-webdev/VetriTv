import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyDlkfKOFRULXjw1R0q6JwGtgXimDPpWZYE';
const CHANNEL_ID = 'UCHK8XG0Jn257CC6TQSkq_Rw';

export async function GET() {
  try {
    console.log("🔁 Starting Shorts Fetch");

    // Step 1: Get recent video IDs
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=15&type=video`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    console.log("🔍 Search result:", JSON.stringify(searchData, null, 2));

    if (!searchData.items || searchData.items.length === 0) {
      console.log("❌ No videos found in search");
      return NextResponse.json([]);
    }

    const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');

    // Step 2: Fetch video details
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();
    console.log("🎥 Details data:", JSON.stringify(detailsData, null, 2));

    const shorts = detailsData.items.filter((video: any) => {
      const duration = video.contentDetails.duration;
      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/); // Match minutes & seconds
      const minutes = parseInt(match?.[1] || '0', 10);
      const seconds = parseInt(match?.[2] || '0', 10);
      return minutes * 60 + seconds < 60;
    });

    console.log("✅ Filtered Shorts:", shorts.length);

    const formatted = shorts.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
    }));
    

    return NextResponse.json(formatted);
  } catch (err) {
    console.error("❌ ERROR:", err);
    return NextResponse.json({ error: 'Failed to fetch shorts' }, { status: 500 });
  }
}
