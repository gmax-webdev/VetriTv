'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabaseClient';
import './AddPostForm.css';

const TiptapEditor = dynamic(() => import('@/components/Editor/TiptapEditor'), { ssr: false });

export default function AddPostForm() {
  const router = useRouter();
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [author, setAuthor] = useState('');
  const [postStatus, setPostStatus] = useState<'draft' | 'published'>('draft');

  // ✅ Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        alert('You must be logged in to add posts');
        router.push('/admin/login');
      } else {
        setUserId(data.user.id);
        setAuthor(data.user.user_metadata?.full_name || data.user.email || 'Unknown User');
      }
    };
    getUser();
  }, [router]);

  // ✅ Featured Image Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ✅ Featured Image Upload
  const handleImageUpload = async (): Promise<string> => {
    if (!featuredImage) return '';
    setUploading(true);

    try {
      const fileExt = featuredImage.name.split('.').pop();
      const fileName = `featured/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage.from('posts').upload(filePath, featuredImage);
      if (error) throw error;

      const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.error('Image upload error:', err);
      return '';
    } finally {
      setUploading(false);
    }
  };

  // ✅ Add Media (multiple images)
  const handleMediaFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `media/${Date.now()}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error } = await supabase.storage.from('posts').upload(filePath, file);
        if (error) throw error;

        const { data } = supabase.storage.from('posts').getPublicUrl(filePath);
        const imageUrl = data.publicUrl;

        if ((window as any).editor) {
          (window as any).editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      }
    } catch (err) {
      console.error('Media upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Add/Remove Tags
  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tagList.includes(newTag)) {
      setTagList([...tagList, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  // ✅ Submit post manually (not auto submit)
  const handleSubmit = async () => {
    if (uploading) return;
    setUploading(true);

    if (!userId) {
      alert('User not found. Try logging in again.');
      setUploading(false);
      return;
    }

    const imageUrl = await handleImageUpload();

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        category: categories,
        tags: tagList,
        featured_image: imageUrl,
        status: postStatus,
        user_id: userId,
        author,
      },
    ]);

    if (error) {
      console.error(error.message);
      alert('Failed to save post');
    } else {
      alert(postStatus === 'published' ? 'Post published!' : 'Draft saved!');
      router.push('/admin/my-posts');
    }

    setUploading(false);
  };

  return (
    <form
      className="add-post-form"
      onSubmit={(e) => e.preventDefault()} // ✅ Prevents auto-refresh!
    >
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

          {/* <div className="editor-toolbar">
            <button type="button" onClick={() => mediaInputRef.current?.click()}>
              + Add Media
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={mediaInputRef}
              style={{ display: 'none' }}
              onChange={handleMediaFiles}
            />
          </div> */}

          <div className="content-editor">
            <TiptapEditor content={content} setContent={setContent} />
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
            <button
              type="button"
              className="draft-button"
              disabled={uploading}
              onClick={() => {
                setPostStatus('draft');
                handleSubmit();
              }}
            >
              {uploading ? 'Saving...' : 'Save Draft'}
            </button>

            <button
              type="button"
              className="publish-button"
              disabled={uploading}
              onClick={() => {
                setPostStatus('published');
                handleSubmit();
              }}
            >
              {uploading ? 'Publishing...' : 'Publish'}
            </button>
          </div>

          <div className="box">
            <h4>Categories</h4>
            <div className="category-checkboxes">
              {[
                'உள்நாட்டுச்செய்திகள்',
                'World News',
                'இலங்கை அரசியல்',
                'உலக அரசியல்',
                'Sports',
                'கல்வி',
                'சினிமா',
                'technology',
                'மருத்துவம்',
                'Science',
              ].map((cat) => (
                <label key={cat} className="category-checkbox">
                  <input
                    type="checkbox"
                    value={cat}
                    checked={categories.includes(cat)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategories((prev) => [...prev, cat]);
                      } else {
                        setCategories((prev) => prev.filter((c) => c !== cat));
                      }
                    }}
                  />
                  {cat}
                </label>
              ))}
            </div>
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
