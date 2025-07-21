import { supabase } from '@/lib/supabaseClient';
import './political.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt: string | null;
  created_at: string;
}

// Remove HTML tags and inline styles from excerpt
function stripHtml(html: string | null) {
  if (!html) return '';
  return html
    .replace(/style="[^"]*"/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export default async function PoliticalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'இலங்கை அரசியல்')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        இலங்கை அரசியல் செய்திகள் இல்லை.
      </p>
    );
  }

  return (
    <div className="political-wrapper">
      <div className="political-banner-wrapper">
        <img
          src="/Assets/political_news.webp" // Replace with your banner image path
          alt="Political Banner"
          className="political-banner"
        />
        <div className="political-label">
          <span className="orange-bar" />
          <span>இலங்கை அரசியல்</span>
        </div>
      </div>

      <div className="political-all-section">
        {posts.map((post) => (
          <div key={post.id} className="political-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="political-news-image"
              />
            )}
            <div className="political-news-content">
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
