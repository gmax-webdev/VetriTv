import { supabase } from '@/lib/supabaseClient';
import './technology.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function TechnologyPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'Technology')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        டெக்னாலஜி செய்திகள் இல்லை.
      </p>
    );
  }

  return (
    <div className="technology-wrapper">
      <div className="technology-banner-wrapper">
        <img
          src="/Assets/technology news1.jpg" // ✅ Update path to your tech banner
          alt="Technology Banner"
          className="technology-banner"
        />
        <div className="technology-label">
          <span className="orange-bar" />
          <span>Technology</span>
        </div>
      </div>

      <div className="technology-all-section">
        {posts.map((post) => (
          <div key={post.id} className="technology-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="technology-news-image"
              />
            )}
            <div className="technology-news-content">
              <h3>
                <a
                  href={`https://vettritv.lk/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.title}
                </a>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
