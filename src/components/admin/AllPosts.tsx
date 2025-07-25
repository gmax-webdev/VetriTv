'use client';

import { useEffect, useState } from 'react';
import './AllPosts.css';

interface Post {
  id: number;
  title: string;
  author?: string;
  category?: string;
  tags?: string[];
  created_at: string;
  views?: number;
  comments?: number;
  featured_image?: string;
}

const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/admin/posts');
      const data = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  // Filter by title (not author), and category
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory === '' || post.category === filterCategory)
  );

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    await fetch('/api/admin/delete-post', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });

    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="admin-posts-container">
      <h2>📰 All Posts</h2>

      <div className="post-filters">
        <input
          type="text"
          placeholder="🔍 Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="உள்நாட்டுச்செய்திகள்">Local News</option>
          <option value="World News">World News</option>
          <option value="இலங்கை அரசியல்">Political</option>
          <option value="உலக அரசியல்">World political</option>
          <option value="Sports">Sports</option>
          <option value="கல்வி">Education</option>
          <option value="சினிமா">Cinema</option>
          <option value="Technology">Technology</option>
          <option value="மருத்துவம்">Medical</option>
          <option value="Science">Science</option>
        </select>
      </div>

      <table className="admin-posts-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Date</th>
            <th>Views</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>
                {post.featured_image ? (
                  <img src={post.featured_image} alt="thumb" className="thumbnail" />
                ) : (
                  'N/A'
                )}
              </td>
              <td>{post.title}</td>
              <td>{post.author || 'N/A'}</td>
              <td>{post.category || 'N/A'}</td>
              <td>{post.tags?.join(', ') || 'None'}</td>
              <td>
                <pre>
                  Published
                  {'\n'}
                  {new Date(post.created_at).toLocaleDateString('en-CA')} at{' '}
                  {new Date(post.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </pre>
              </td>
              <td>{post.views ?? 0}</td>
              <td>{post.comments ?? 0}</td>
              <td className="actions-cell">
                <button
                  className="view-btn"
                  onClick={() => window.open(`/news/${post.id}`, '_blank')}
                  title="View Post"
                >
                  👁️
                </button>
                <button
                  className="edit-btn"
                  onClick={() => (window.location.href = `/admin/edit-post/${post.id}`)}
                  title="Edit Post"
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(post.id)}
                  title="Delete Post"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPosts;
