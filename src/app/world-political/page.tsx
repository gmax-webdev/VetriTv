import { supabase } from '@/lib/supabaseClient';
import './world-political.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt: string | null;
  created_at: string;
}

function stripHtml(html: string | null) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}

export default async function WorldPoliticalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'உலக அரசியல்')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        உலக அரசியல் செய்திகள் கிடைக்கவில்லை.
      </p>
    );
  }

  return (
    <div className="worldpolitical-wrapper">
      <div className="worldpolitical-banner-wrapper">
        <img
          src="/Assets/"
          alt="World Politics Banner"
          className="worldpolitical-banner"
        />
        <div className="worldpolitical-label">
          <span className="orange-bar" />
          <span>உலக அரசியல்</span>
        </div>
      </div>

      <div className="worldpolitical-all-section">
        {posts.map((post) => (
          <div key={post.id} className="worldpolitical-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="worldpolitical-news-image"
              />
            )}
            <div className="worldpolitical-news-content">
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
