import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('category', 'sports') // ✅ case-insensitive match
    .order('created_at', { ascending: false })
    .limit(5);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
