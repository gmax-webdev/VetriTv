import { supabase } from '@/lib/supabaseClient';
import './education.css';
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

export default async function EducationPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'கல்வி')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching கல்வி posts:', error.message);
    return <div>Error loading கல்வி news</div>;
  }

  if (!posts || posts.length === 0) {
    return <div>⚠️ கல்வி பதிவுகள் இல்லை</div>;
  }

  return (
    <div className="education-list">
      <h1 className="edu-section-title">📚 கல்வி செய்திகள்</h1>
      <ul className="edu-news-list">
        {posts.map((post) => (
          <li key={post.id} className="edu-news-item">
            {post.featured_image && (
              <Link href={`/education/${post.slug}`}>
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="edu-news-thumbnail"
                />
              </Link>
            )}
            <div className="edu-news-content">
              <h2 className="edu-news-title">
                <Link href={`/education/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="edu-news-excerpt">{stripHtml(post.content)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
