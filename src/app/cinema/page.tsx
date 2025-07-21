import { supabase } from '@/lib/supabaseClient';
import './cinema.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function CinemaPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'சினிமா')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        சினிமா செய்திகள் இல்லை.
      </p>
    );
  }

  return (
    <div className="cinema-wrapper">
      <div className="cinema-banner-wrapper">
        <img
          src="/Assets/cinema.jpg" // ✅ Use your actual banner image path
          alt="Cinema Banner"
          className="cinema-banner"
        />
        <div className="cinema-label">
          <span className="orange-bar" />
          <span>சினிமா</span>
        </div>
      </div>

      <div className="cinema-all-section">
        {posts.map((post) => (
          <div key={post.id} className="cinema-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="cinema-news-image"
              />
            )}
            <div className="cinema-news-content">
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
