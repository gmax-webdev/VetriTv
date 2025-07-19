import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Local News category = "உள்நாட்டுச்செய்திகள்"
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', 'உள்நாட்டுச்செய்திகள்') // ✅ updated here
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Local News:', error);
    return NextResponse.json({ error: 'Failed to fetch local news' }, { status: 500 });
  }
}
