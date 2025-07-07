import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://vettritv.lk/wp-json/wp/v2/posts?per_page=3&_fields=id,title,link'
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }

    const data = await res.json();

    const news = data.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      link: post.link,
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error('Breaking News API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
