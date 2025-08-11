'use client';

import './dashboard.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const router = useRouter();
  const [userChecked, setUserChecked] = useState(false);
  const [visitors, setVisitors] = useState(0);
  const [views, setViews] = useState(0);
  const [posts, setPosts] = useState(0);
  const [messages, setMessages] = useState(0);
  const [recentActivities, setRecentActivities] = useState<string[]>([]);

  // Check login on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('newsUpdater');
    if (!storedUser) {
      router.push('/admin/login');
      return;
    }
    setUserChecked(true);
  }, [router]);

  // Fetch dashboard data once user is verified
  useEffect(() => {
    if (!userChecked) return;

    const fetchDashboardData = async () => {
      try {
        // Posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false });

        if (postsError) throw postsError;
        setPosts(postsData?.length || 0);

        // Messages
        const { data: messagesData, error: messagesError } = await supabase
          .from('messages')
          .select('id, name, created_at')
          .order('created_at', { ascending: false });

        if (messagesError) throw messagesError;
        setMessages(messagesData?.length || 0);

        // Analytics: visitors & page_views for today
        const today = new Date().toISOString().slice(0, 10);

        const { data: analyticsData, error: analyticsError } = await supabase
          .from('analytics')
          .select('visitors, page_views')
          .eq('date', today)
          .single();

        if (analyticsError && analyticsError.code !== 'PGRST116') {
          throw analyticsError;
        }

        setVisitors(analyticsData?.visitors || 0);
        setViews(analyticsData?.page_views || 0);

        // Recent Activities
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
  }, [userChecked]);

  if (!userChecked) {
    return (
      <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>📊 Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('newsUpdater');
            router.push('/admin/login');
          }}
          style={{
            backgroundColor: '#900f0f',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
          title="Logout"
        >
          Logout
        </button>
      </div>

      <div
        className="stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 20,
          marginTop: 20,
        }}
      >
        <div
          className="stat-card visitors"
          style={{
            backgroundColor: '#f0f8ff',
            borderRadius: 8,
            padding: 20,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Visitors</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{visitors.toLocaleString()}</p>
        </div>

        <div
          className="stat-card views"
          style={{
            backgroundColor: '#fff0f0',
            borderRadius: 8,
            padding: 20,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Page Views</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{views.toLocaleString()}</p>
        </div>

        <div
          className="stat-card posts"
          style={{
            backgroundColor: '#f0fff0',
            borderRadius: 8,
            padding: 20,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Total Posts</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{posts}</p>
        </div>

        <div
          className="stat-card messages"
          style={{
            backgroundColor: '#fffaf0',
            borderRadius: 8,
            padding: 20,
            textAlign: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          }}
        >
          <h3>Messages</h3>
          <p style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>{messages}</p>
        </div>
      </div>

      <div className="recent-activities" style={{ marginTop: 40 }}>
        <h2>🕒 Recent Activities</h2>
        <ul style={{ lineHeight: 1.6, fontSize: 16, paddingLeft: 20 }}>
          {recentActivities.map((activity, i) => (
            <li key={i}>{activity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
