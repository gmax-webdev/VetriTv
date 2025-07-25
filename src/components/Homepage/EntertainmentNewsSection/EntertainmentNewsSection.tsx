'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import './EntertainmentNewsSection.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  category: string;
}

// ✅ Strip unwanted HTML tags from excerpt
function stripHtml(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}

export default function EntertainmentNewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

 useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .in('category', ['technology', 'science', 'மருத்துவம்'])
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return;
    }

    console.log('Fetched Posts:', data);

    // ✅ New logic for different post limits per category
    const grouped: Post[] = [];

    const techPosts = data.filter((p) => p.category === 'technology').slice(0, 3);
    const medPosts = data.filter((p) => p.category === 'மருத்துவம்').slice(0, 4);
    const sciPosts = data.filter((p) => p.category === 'science').slice(0, 3);

    grouped.push(...medPosts, ...techPosts, ...sciPosts);

    setPosts(grouped);
  };

  fetchPosts();
}, []);


  return (
  <section className="entertainment-section">
    <h2 className="section-title">Entertainment</h2>

    <div className="entertainment-featured-layout">
      {posts.length > 0 && (
        <div className="large-card">
          <Link href={`/news/${posts[0].id}`}>
            <div className="category-label">{posts[0].category}</div>
            <img
              src={posts[0].featured_image}
              alt={posts[0].title}
              className="large-thumbnail"
            />
            <h3 className="large-title">{posts[0].title.slice(0, 90)}...</h3>
          </Link>
        </div>
      )}

      <div className="small-cards-grid">
        {posts.slice(1).map((post) => (
          <div key={post.id} className="small-card">
            <Link href={`/news/${post.id}`}>
              <div className="category-label">{post.category}</div>
              <img
                src={post.featured_image}
                alt={post.title}
                className="small-thumbnail"
              />
              <h3 className="small-title">{post.title.slice(0, 60)}...</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

}
