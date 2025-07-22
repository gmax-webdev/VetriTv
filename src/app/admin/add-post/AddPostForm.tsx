'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './AddPostForm.css';

export default function AddPostForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // Ref for Add Media image uploader
  const mediaInputRef = useRef<HTMLInputElement>(null);
  
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

    const fileExt = featuredImage.name.split('.').pop();
    const fileName = `featured/${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(filePath, featuredImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      alert('Image upload failed');
      setUploading(false);
      return '';
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('posts').getPublicUrl(filePath);

    setUploading(false);
    return publicUrl;
  };

  const handleMediaImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `inline/${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('posts')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Upload Error:', uploadError);
      alert('Image upload failed');
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('posts').getPublicUrl(filePath);

    // Insert image HTML into content
    setContent((prevContent) => `${prevContent}\n<img src="${publicUrl}" alt="" />`);
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
      console.error(error.message);
    }
  };

  return (
    <form className="add-post-form" onSubmit={handleSubmit}>
      <div className="post-container">
        {/* LEFT Column: Editor */}
        <div className="post-editor">
          <input
            type="text"
            placeholder="Add title"
            className="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="editor-toolbar">
            <button
              type="button"
              className="add-media-btn"
              onClick={() => mediaInputRef.current?.click()}
            >
              + Add Media
            </button>
          </div>

          <div className="content-editor">
            <textarea
              placeholder="Start writing or type / to choose a block"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              required
            />
          </div>

          {/* Hidden file input for Add Media */}
          <input
            type="file"
            accept="image/*"
            ref={mediaInputRef}
            style={{ display: 'none' }}
            onChange={handleMediaImageUpload}
          />

          <div className="featured-image-box">
            <label>Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
          </div>
        </div>

        {/* RIGHT Column: Sidebar */}
        <div className="post-sidebar">
          <div className="box publish-box">
            <h4>Publish</h4>
            <button type="submit" className="publish-button" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Publish'}
            </button>
          </div>

          <div className="box">
            <h4>Categories</h4>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="Local News">Local News</option>
              <option value="World News">World News</option>
              <option value="Politics">Politics</option>
              <option value="Updates">Updates</option>
            </select>
          </div>

          <div className="box">
            <h4>Tags</h4>
            <input
              type="text"
              placeholder="Separate tags with commas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="box">
            <h4>Format</h4>
            <div className="format-options">
              <label><input type="radio" name="format" defaultChecked /> Standard</label>
              <label><input type="radio" name="format" /> Image</label>
              <label><input type="radio" name="format" /> Video</label>
              <label><input type="radio" name="format" /> Audio</label>
              <label><input type="radio" name="format" /> Gallery</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
