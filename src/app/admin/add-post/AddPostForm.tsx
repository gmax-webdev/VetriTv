'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './AddPostForm.css';

export default function AddPostForm() {
  const router = useRouter();
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [author, setAuthor] = useState('');


 useEffect(() => {
  const getUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      alert('You must be logged in to add posts');
      router.push('/admin/login');
    } else {
      setUserId(data.user.id);
      // NEW: set author name here
      setAuthor(data.user.user_metadata?.full_name || data.user.email || 'Unknown User');
    }
  };
  getUser();
}, [router]);


  // ✅ Image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ✅ Upload featured image
  const handleImageUpload = async (): Promise<string> => {
    if (!featuredImage) return '';
    setUploading(true);

    try {
      const fileExt = featuredImage.name.split('.').pop();
      const fileName = `featured/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, featuredImage, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('posts').getPublicUrl(filePath);

      return publicUrl;
    } catch (err) {
      alert('Image upload failed');
      console.error('Upload Error:', err);
      return '';
    } finally {
      setUploading(false);
    }
  };

  // ✅ Inline media upload
  const handleMediaImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `inline/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('posts')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from('posts').getPublicUrl(filePath);

      setContent((prev) => `${prev}\n<img src="${publicUrl}" alt="" />`);
    } catch (err) {
      alert('Inline image upload failed');
      console.error(err);
    }
  };

  // ✅ Add tag
  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
      setTagInput('');
    }
  };

  // ✅ Remove tag
  const removeTag = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  // ✅ Submit post
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    if (!userId) {
      alert('User not found. Try logging in again.');
      setUploading(false);
      return;
    }

    const imageUrl = await handleImageUpload();

    const htmlContent = content
      .split(/\n{2,}/)
      .map((para) => `<p>${para.trim().replace(/\n/g, '<br />')}</p>`)
      .join('\n');

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content: htmlContent,
        category,
        tags: tagList,
        featured_image: imageUrl,
        status: 'published',
        user_id: userId,
        author: author,
      },
    ]);

    if (error) {
      alert('Failed to publish post');
      console.error(error.message);
    } else {
      alert('Post published successfully!');
      router.push('/admin/my-posts');
    }

    setUploading(false);
  };

  return (
    <form className="add-post-form" onSubmit={handleSubmit}>
      <div className="post-container">
        {/* LEFT COLUMN */}
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
            <button type="button" onClick={() => mediaInputRef.current?.click()}>
              + Add Media
            </button>
            <input
              type="file"
              accept="image/*"
              ref={mediaInputRef}
              style={{ display: 'none' }}
              onChange={handleMediaImageUpload}
            />
          </div>

          <div className="content-editor">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write content here..."
              rows={12}
              required
            />
          </div>

          <div className="featured-image-box">
            <label>Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="post-sidebar">
          <div className="box publish-box">
            <h4>Publish</h4>
            <button type="submit" className="publish-button" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Publish'}
            </button>
          </div>

          <div className="box">
            <h4>Category</h4>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
          </div>

          <div className="box">
            <h4>Tags</h4>
            <div className="tag-input-wrapper">
              <input
                type="text"
                placeholder="Type a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button type="button" onClick={handleAddTag} className="add-tag-button">
                Add
              </button>
            </div>
            <div className="tag-preview">
              {tagList.map((tag) => (
                <span key={tag} className="tag-item">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="tag-remove">
                    ×
                  </button>
                </span>
              ))}
            </div>
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
