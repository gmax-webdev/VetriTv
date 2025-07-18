import { supabase } from '@/lib/supabaseClient';
import './WorldNews.css';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  content: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').slice(0, 100) + '...';
}

export default async function WorldNewsPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'World News') // ✅ match your existing filter
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching World News:', error.message);
    return <div>❌ Failed to load world news.</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>🌍 No World News posts available.</div>;
  }

  return (
    <div className="world-news-list">
      <h1 className="world-section-title">🌍 World News</h1>
      <ul className="world-news-items">
        {posts.map((post) => (
          <li key={post.id} className="world-news-item">
            {post.featured_image && (
              <Link href={`/world/${post.slug}`}>
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="world-thumbnail"
                />
              </Link>
            )}
            <div className="world-news-content">
              <h2 className="world-news-title">
                <Link href={`/world/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="world-news-excerpt">{stripHtml(post.content)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
