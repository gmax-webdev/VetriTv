import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './political.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function PoliticalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'இலங்கை அரசியல்')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Political fetch error:', error);
    return <p>இலங்கை அரசியல் செய்திகள் இல்லை.</p>;
  }

  return (
    <main className="political-page">
      <h1 className="political-page-title">🗳️ இலங்கை அரசியல் செய்திகள்</h1>
      <div className="political-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="political-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="political-page-img" />
            )}
            <h3 className="political-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
