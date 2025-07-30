'use client';

import './dashboard.css';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [visitors, setVisitors] = useState(0);
  const [views, setViews] = useState(0);
  const [posts, setPosts] = useState(0);
  const [messages, setMessages] = useState(0);
  const [recentActivities, setRecentActivities] = useState<string[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 📰 Total Posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData?.length || 0);

        // 📥 Total Messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('id, name, created_at')
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;
        setMessages(messagesData?.length || 0);

        // 📈 Visitors and Views (today's)
        const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

        const { data: analyticsData, error: analyticsError } = await supabase
          .from('analytics')
          .select('visitors, page_views')
          .eq('date', today)
          .single();

        if (analyticsError && analyticsError.code !== 'PGRST116') {
          // Ignore "row not found" error
          throw analyticsError;
        }

        setVisitors(analyticsData?.visitors || 0);
        setViews(analyticsData?.page_views || 0);

        // 🕒 Recent Activities
        const recent: string[] = [];

        if (postsData && postsData.length > 0) {
          recent.push(`📰 New post published: "${postsData[0].title}"`);
        }

        if (messagesData && messagesData.length > 0) {
          recent.push(`📥 Message received from ${messagesData[0].name}`);
        }

        recent.push('📝 Post updated: "Election Results Live"');
        recent.push('💬 Comment added on: "Budget 2025"');

        setRecentActivities(recent.slice(0, 4));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>📊 Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card visitors">
          <h3>Visitors</h3>
          <p>{visitors.toLocaleString()}</p>
        </div>
        <div className="stat-card views">
          <h3>Page Views</h3>
          <p>{views.toLocaleString()}</p>
        </div>
        <div className="stat-card posts">
          <h3>Total Posts</h3>
          <p>{posts}</p>
        </div>
        <div className="stat-card messages">
          <h3>Messages</h3>
          <p>{messages}</p>
        </div>
      </div>

      <div className="recent-activities">
        <h2>🕒 Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
