import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './world-political.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function WorldPoliticalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'உலக அரசியல்')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('World Political fetch error:', error);
    return <p>உலக அரசியல் செய்திகள் கிடைக்கவில்லை.</p>;
  }

  return (
    <main className="worldpolitical-page">
      <h1 className="worldpolitical-title">🌍 உலக அரசியல் செய்திகள்</h1>
      <div className="worldpolitical-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="worldpolitical-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="worldpolitical-img" />
            )}
            <h3 className="worldpolitical-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
