import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link'; // ✅ Import Link for internal routing
import './political.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  excerpt: string | null;
  created_at: string;
}

// Utility: remove inline styles and HTML tags from excerpt
function stripHtml(html: string | null) {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '') // remove <style> blocks
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // remove <script> blocks
    .replace(/<[^>]*>?/gm, '') // remove all tags including broken ones
    .replace(/\s{2,}/g, ' ') // remove multiple spaces
    .trim();
}

export default async function PoliticalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, excerpt, created_at')
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
          src="/Assets/political_news.webp"
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
              <Link href={`/news/${post.id}`}>
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="political-news-image"
                />
              </Link>
            )}
            <div className="political-news-content">
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
