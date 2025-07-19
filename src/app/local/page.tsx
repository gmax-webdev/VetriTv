import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './local.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function LocalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'உள்நாட்டுச்செய்திகள்')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Local fetch error:', error);
    return <p>உள்நாட்டுச் செய்திகள் கிடைக்கவில்லை.</p>;
  }

  return (
    <main className="local-page">
      <h1 className="local-page-title">📌 உள்நாட்டுச் செய்திகள்</h1>
      <div className="local-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="local-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="local-page-img" />
            )}
            <h3 className="local-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
