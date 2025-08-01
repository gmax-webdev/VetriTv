'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './MyPosts.css';

interface Post {
  id: number;
  title: string;
  created_at: string;
  status: string;
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const fetchPosts = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData?.session?.user) {
      alert('You must be logged in to view this page');
      router.push('/admin/login');
      return;
    }

    const user = sessionData.session.user;
    const fullName = user.user_metadata?.name || user.user_metadata?.full_name;

    setUserName(fullName || 'Unknown User');
    setUserId(user.id);

    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('id, title, created_at, status')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Failed to fetch posts:', postsError.message);
    } else {
      setPosts(postsData || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    const confirm = window.confirm('Are you sure you want to delete this post?');
    if (!confirm) return;

    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
      alert('Failed to delete post');
      console.error(error.message);
    } else {
      alert('Post deleted successfully');
      fetchPosts(); // Refresh list
    }
  };

  return (
    <div className="my-posts-page">
      <h1>📰 My Posts</h1>
      {userName && (
        <p className="welcome-message">
          Welcome, <strong>{userName}</strong> 👋
        </p>
      )}

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-meta">
                Published on {new Date(post.created_at).toLocaleDateString()} | Status: {post.status}
              </p>
              <div className="post-actions">
                <button onClick={() => router.push(`/admin/edit/${post.id}`)}>✏️ Edit</button>
                <button onClick={() => handleDelete(post.id)} className="delete-button">🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
