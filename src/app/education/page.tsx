import { supabase } from '@/lib/supabaseClient';
import './education.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  content: string;
}

// Clean HTML and limit excerpt
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s{2,}/g, ' ')
    .slice(0, 100)
    .trim() + '...';
}

export default async function EducationPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('category', 'கல்வி')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        கல்வி செய்திகள் கிடைக்கவில்லை.
      </p>
    );
  }

  return (
    <div className="education-wrapper">
      <div className="education-banner-wrapper">
        <img
          src="/Assets/education news 2.jpg" // ✅ Update this path to your actual banner
          alt="Education Banner"
          className="education-banner"
        />
        <div className="education-label">
          <span className="orange-bar" />
          <span>கல்வி</span>
        </div>
      </div>

      <div className="education-all-section">
        {posts.map((post) => (
          <div key={post.id} className="education-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="education-news-image"
              />
            )}
            <div className="education-news-content">
              <h3>
                <a
                  href={`https://vettritv.lk/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              </h3>
              <p>{stripHtml(post.content)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
