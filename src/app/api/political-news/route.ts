// src/app/api/political-news/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', 'இலங்கை அரசியல்') // ✅ match your category name
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching political news:', error);
    return NextResponse.json({ error: 'Failed to fetch political news' }, { status: 500 });
  }
}
