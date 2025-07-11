'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // Adjust path if needed
import './AddPostForm.css'; // Your styling file

export default function AddPostForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!featuredImage) return '';
    setUploading(true);
    const { data, error } = await supabase.storage
      .from('news')
      .upload(`featured/${Date.now()}_${featuredImage.name}`, featuredImage);

    setUploading(false);
    if (error) {
      alert('Image upload failed');
      return '';
    }
    return supabase.storage.from('news').getPublicUrl(data.path).data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        category,
        tags: tags.split(',').map((t) => t.trim()),
        featured_image: imageUrl,
        status: 'published',
      },
    ]);

    if (!error) {
      alert('Post published successfully!');
      router.push('/');
    } else {
      alert('Failed to publish post');
    }
  };

  return (
    <form className="add-post-form" onSubmit={handleSubmit}>
      <h2>Add News Post</h2>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Local News">Local News</option>
        <option value="World News">World News</option>
        <option value="Politics">Politics</option>
        <option value="Updates">Updates</option>
      </select>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="image-preview" />
      )}

      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Publish'}
      </button>
    </form>
  );
}
