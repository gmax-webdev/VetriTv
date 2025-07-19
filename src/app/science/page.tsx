import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './science.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function SciencePage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'Science')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Science fetch error:', error);
    return <p>Science news is currently unavailable.</p>;
  }

  return (
    <main className="science-page">
      <h1 className="science-page-title">🔬 Science News</h1>
      <div className="science-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="science-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="science-page-img" />
            )}
            <h3 className="science-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
