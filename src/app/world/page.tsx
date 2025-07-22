import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
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
                <Link href={`/news/${post.id}`}>
                  {post.title}
                </Link>
              </h3>
              <p>{stripHtml(post.excerpt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
