import { supabase } from '@/lib/supabaseClient';
import './medical.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  featured_image: string | null;
  created_at: string;
}

export default async function MedicalPage() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, featured_image, created_at')
    .eq('category', 'மருத்துவம்')
    .order('created_at', { ascending: false });

  if (error || !posts || posts.length === 0) {
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>
        மருத்துவம் செய்திகள் இல்லை.
      </p>
    );
  }

  return (
    <div className="medical-wrapper">
      <div className="medical-banner-wrapper">
        <img
          src="/Assets/medical.webp" // ✅ Replace with your actual banner image path
          alt="Medical Banner"
          className="medical-banner"
        />
        <div className="medical-label">
          <span className="orange-bar" />
          <span>மருத்துவம்</span>
        </div>
      </div>

      <div className="medical-all-section">
        {posts.map((post) => (
          <div key={post.id} className="medical-news-item">
            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="medical-news-image"
              />
            )}
            <div className="medical-news-content">
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
