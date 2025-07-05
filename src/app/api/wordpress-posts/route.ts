// src/app/api/wordpress-latest-news/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://vettritv.lk/wp-json/wp/v2/posts?per_page=10', {
      headers: { 'Content-Type': 'application/json' }
    });
    const posts = await res.json();

    // Optional: clean up posts
    const cleanedPosts = posts.map((post: any) => ({
      id: post.id,
      title: post.title.rendered,
      link: post.link,
      excerpt: post.excerpt.rendered
    }));

    return NextResponse.json(cleanedPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
