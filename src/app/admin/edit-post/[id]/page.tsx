'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabaseClient';
import './EditPost.css';

const TiptapEditor = dynamic(() => import('@/components/Editor/TiptapEditor'), {
  ssr: false,
});

export default function EditPostPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        alert('❌ Failed to fetch post.');
        console.error(error);
      } else if (data) {
        setPost(data);
        setTitle(data.title || '');
        setContent(data.content || '');
        setCategory(typeof data.category === 'string' ? data.category : '');
        setTags(Array.isArray(data.tags) ? data.tags.join(', ') : '');
        setFeaturedImage(data.featured_image || '');
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    if (file.size > 5 * 1024 * 1024) {
      alert('❌ File size exceeds 5MB.');
      setUploading(false);
      return;
    }

    const ext = file.name.split('.').pop();
    const path = `featured/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from('posts')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (error) {
      alert('❌ Failed to upload image.');
      console.error(error);
    } else {
      const { data } = supabase.storage.from('posts').getPublicUrl(path);
      setFeaturedImage(data.publicUrl);
    }

    setUploading(false);
  };

  const handleUpdate = async () => {
  if (!title.trim()) return alert('❌ Title is required');
  if (!category.trim()) return alert('❌ Category is required');
  if (uploading) return alert('⏳ Please wait for image upload to finish');

  const updatedPost = {
    title: title.trim(),
    content,
    category: category.trim(),
    tags: tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    featured_image: featuredImage,
  };

  console.log('🔍 Updating post with ID:', id);
  console.log('Updated post content:', updatedPost);

  const { data, error } = await supabase
    .from('posts')
    .update(updatedPost)
    .eq('id', Number(id)) // or id.trim() if UUID
    .select();

  if (error) {
    alert('❌ Failed to update post.');
    console.error('Update error:', error);
  } else if (data.length === 0) {
    alert('❌ No post was updated. Double-check the ID.');
    console.warn('No post matched the given ID');
  } else {
    alert('✅ Post updated successfully!');
    console.log('✅ Updated post:', data[0]);
    router.refresh();
    router.push('/admin/all-posts');
  }
};


  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>❌ Post not found.</p>;

  return (
    <div className="edit-post-container">
      <h2>✏️ Edit Post</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Content</label>
      <div className="content-editor">
        <TiptapEditor content={content} setContent={setContent} />
      </div>

      <label htmlFor="image">Upload New Featured Image</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <p>Uploading image...</p>}

      {featuredImage && (
        <div className="preview-box">
          <img src={featuredImage} alt="Featured" className="preview-image" />
          <button onClick={() => setFeaturedImage('')} className="remove-btn" type="button">
            ❌ Remove
          </button>
        </div>
      )}

      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="உள்நாட்டுச்செய்திகள்">Local News</option>
        <option value="World News">World News</option>
        <option value="இலங்கை அரசியல்">Political</option>
        <option value="உலக அரசியல்">World Political</option>
        <option value="Sports">Sports</option>
        <option value="கல்வி">Education</option>
        <option value="சினிமா">Cinema</option>
        <option value="Technology">Technology</option>
        <option value="மருத்துவம்">Medical</option>
        <option value="Science">Science</option>
      </select>

      <label htmlFor="tags">Tags (comma separated)</label>
      <input
        id="tags"
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
