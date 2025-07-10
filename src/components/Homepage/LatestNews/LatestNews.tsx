'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      setNews(data || []);
    };

    fetchNews();
  }, []);

  return (
    <section>
      <h2>Latest News</h2>
      <div className="news-list">
        {news.map((n) => (
          <div key={n.id}>
            <img src={n.image_url} width="100%" />
            <h3>{n.title}</h3>
            <p>{n.content}</p>
            <small>{n.category}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
