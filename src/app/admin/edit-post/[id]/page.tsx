'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabaseClient';
import './EditPost.css';

// ✅ Load the rich text editor dynamically
const TiptapEditor = dynamic(() => import('@/components/Editor/TiptapEditor'), { ssr: false });

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch post by ID
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        alert('Failed to fetch post');
        console.error(error);
        setLoading(false);
        return;
      }

      if (data) {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category || '');
        setTags(data.tags?.join(', ') || '');
        setFeaturedImage(data.featured_image || '');
      }

      setLoading(false);
    };

    if (id) fetchPost();
  }, [id]);

  // ✅ Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB.');
      setUploading(false);
      return;
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `featured/${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('posts')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (error) {
      alert('❌ Image upload failed');
      console.error('Upload error:', error);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
    setFeaturedImage(data.publicUrl);
    setUploading(false);
  };

  // ✅ Update post in Supabase
  const handleUpdate = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }
    if (!category.trim()) {
      alert('Category is required');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        content,
        category,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        featured_image: featuredImage,
      })
      .eq('id', id);

    if (error) {
      alert('❌ Failed to update post.');
      console.error(error);
    } else {
      alert('✅ Post updated successfully!');
      router.push('/admin/all-posts');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="edit-post-container">
      <h2>✏️ Edit Post</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Content</label>
      <div className="content-editor">
        <TiptapEditor
          content={content}
          setContent={setContent}
          onEditorReady={(editor) => {
            (window as any).editor = editor;
          }}
        />
      </div>

      <label>Upload New Featured Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading image...</p>}

      {featuredImage && (
        <div className="preview-box">
          <img src={featuredImage} alt="Featured" className="preview-image" />
          <button
            onClick={() => setFeaturedImage('')}
            className="remove-btn"
            type="button"
          >
            ❌ Remove
          </button>
        </div>
      )}

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
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

      <label>Tags (comma separated)</label>
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tag1, tag2, tag3"
      />

      <button
        onClick={handleUpdate}
        className="update-btn"
        disabled={uploading}
      >
        💾 Save Changes
      </button>
    </div>
  );
}
