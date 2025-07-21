// local/page.tsx
import { supabase } from '@/lib/supabaseClient';
import './local.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt?: string;
}

function stripHtml(html: string | null): string {
  if (!html) return '';
  const withoutTags = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s{2,}/g, ' ')
    .trim();

  return withoutTags;
}

export default async function LocalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, excerpt')
    .eq('category', 'உள்நாட்டுச்செய்திகள்')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        உள்நாட்டுச் செய்திகள் கிடைக்கவில்லை.
      </p>
    );
  }

  return (
    <div className="local-wrapper">
      <div className="local-banner-wrapper">
        <img src="/Assets/local news 1.jpg" alt="Local Banner" className="local-banner" />
        <div className="local-label">
          <span className="orange-bar" />
          <span>உள்நாட்டுச் செய்திகள்</span>
        </div>
      </div>

      <div className="local-all-section">
        {posts.map((post) => (
          <div key={post.id} className="local-news-item">
            {post.featured_image && (
              <img src={post.featured_image} alt={post.title} />
            )}
            <div className="local-news-content">
              <h3>
                <a
                  href={`https://vettritv.lk/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              </h3>
              <p>{stripHtml(post.excerpt ?? '')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
