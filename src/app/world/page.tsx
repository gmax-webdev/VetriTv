import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './world.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function WorldPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'World News')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('World fetch error:', error);
    return <p>World news not available right now.</p>;
  }

  return (
    <main className="world-page">
      <h1 className="world-page-title">🌍 World News</h1>
      <div className="world-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="world-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="world-page-img" />
            )}
            <h3 className="world-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
