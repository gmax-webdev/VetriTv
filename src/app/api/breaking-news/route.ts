// src/app/api/breaking-news/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title')   // select only needed columns
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Supabase error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // map posts to minimal object
    const news = data.map(post => ({
      id: post.id,
      title: post.title,
      link: `/news/${post.id}`, // adjust routing if needed
    }));

    return NextResponse.json(news);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
