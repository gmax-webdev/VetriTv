import { supabase } from '@/lib/supabaseClient';
import './sports.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string;
  excerpt: string;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '');
}

export default async function SportsPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .ilike('category', 'sports')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return <p style={{ padding: '20px', textAlign: 'center' }}>No sports news available.</p>;
  }

  return (
    <div className="sports-wrapper">
      <div className="sports-banner-wrapper">
        <img src="/Assets/sports.jpg" alt="Sports Banner" className="sports-banner" />
        <div className="sports-label">
          <span className="orange-bar" />
          <span>Sports</span>
        </div>
      </div>

      <div className="sports-all-section">
        {posts.map((post) => (
          <div key={post.id} className="sports-news-item">
            <img src={post.featured_image} alt={post.title} />
            <div className="sports-news-content">
              <h3>
                <a
                  href={`https://vettritv.lk/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              </h3>
              <p>{stripHtml(post.excerpt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
