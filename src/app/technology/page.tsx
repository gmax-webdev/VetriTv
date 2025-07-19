import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './technology.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function TechnologyPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'Technology')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Technology fetch error:', error);
    return <p>டெக்னாலஜி செய்திகள் ஏற்கனவே கிடைக்கவில்லை.</p>;
  }

  return (
    <main className="technology-page">
      <h1 className="technology-page-title">🖥️ Technology News</h1>
      <div className="technology-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="technology-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="technology-page-img" />
            )}
            <h3 className="technology-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
