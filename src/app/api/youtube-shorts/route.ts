import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const CHANNEL_RSS = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCHK8XG0Jn257CC6TQSkq_Rw';

interface Video {
  id: string;
  title: string | undefined;
  thumbnail: string;
}

export async function GET() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(CHANNEL_RSS);

    const shorts: Video[] = feed.items
      .filter((item) =>
        item.link?.includes('/shorts/') ||
        item.title?.toLowerCase().includes('short')
      )
      .slice(0, 10)
      .map((item) => {
        const videoId = item.link?.split('/').pop() || '';
        return {
          id: videoId,
          title: item.title,
          thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
        };
      });

    return NextResponse.json(shorts);
  } catch (error) {
    console.error('YouTube RSS Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shorts' },
      { status: 500 }
    );
  }
}
