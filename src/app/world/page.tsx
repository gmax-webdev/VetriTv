import { supabase } from '@/lib/supabaseClient';
import './world.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt: string | null;
  created_at: string;
}

function stripHtml(html: string | null): string {
  if (!html) return '';
  const withoutTags = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')  // remove <style> blocks
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // remove <script> blocks
    .replace(/<\/?[^>]+(>|$)/g, '')                  // remove all remaining tags
    .replace(/&nbsp;/gi, ' ')                        // decode common entities
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s{2,}/g, ' ')                         // collapse spaces
    .trim();

  return withoutTags;
}

export default async function WorldPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'World News')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        World news not available right now.
      </p>
    );
  }

  return (
    <div className="world-wrapper">
      {/* 🔼 Banner Section */}
      <div className="world-banner-wrapper">
        <img
          src="/Assets/worldnews.webp"
          alt="World News Banner"
          className="world-banner"
        />
        <div className="world-label">
          <span className="orange-bar" />
          <span>World News</span>
        </div>
      </div>

      {/* 🔽 News Cards */}
      <div className="world-all-section">
        {posts.map((post) => (
          <div key={post.id} className="world-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="world-news-image"
              />
            )}
            <div className="world-news-content">
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
