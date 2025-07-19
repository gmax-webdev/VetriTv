import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './cinema.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function CinemaPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'சினிமா')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Cinema fetch error:', error);
    return <p>சினிமா செய்திகள் ஏற்கனவே கிடைக்கவில்லை.</p>;
  }

  return (
    <main className="cinema-page">
      <h1 className="cinema-page-title">🎬 சினிமா செய்திகள்</h1>
      <div className="cinema-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cinema-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="cinema-page-img" />
            )}
            <h3 className="cinema-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
