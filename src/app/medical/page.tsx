import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import './medical.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function MedicalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'மருத்துவம்')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Medical fetch error:', error);
    return <p>மருத்துவம் செய்திகள் ஏற்கனவே கிடைக்கவில்லை.</p>;
  }

  return (
    <main className="medical-page">
      <h1 className="medical-page-title">🩺 மருத்துவம் செய்திகள்</h1>
      <div className="medical-page-grid">
        {posts?.map((post) => (
          <Link
            key={post.id}
            href={`https://vettritv.lk/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="medical-page-card"
          >
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} className="medical-page-img" />
            )}
            <h3 className="medical-page-headline">{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
