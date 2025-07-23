'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import { supabase } from '@/lib/supabaseClient';
import './AddPostForm.css';

export default function AddPostForm() {
  const router = useRouter();
  const editorRef = useRef<any>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

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

    if (editorRef.current) {
      editorRef.current.insertContent(`<img src="${publicUrl}" alt="media" />`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert('Please select a category.');
      return;
    }

    const imageUrl = await handleImageUpload();

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        category, // Now single category
        tags,
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
        {/* LEFT Column */}
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
            <input
              type="file"
              accept="image/*"
              ref={mediaInputRef}
              style={{ display: 'none' }}
              onChange={handleMediaImageUpload}
            />
          </div>

          <div className="content-editor">
            <Editor
              apiKey="pal967ytpo8qf4nglkkg0yvpiqb9dqjictf72o2hm63fh53d"
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={content}
              onEditorChange={(newValue) => setContent(newValue)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  'advlist autolink lists link image charmap preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste help wordcount',
                ],
                toolbar:
                  'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat | help',
              }}
            />
          </div>

          <div className="featured-image-box">
            <label>Featured Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
          </div>
        </div>

        {/* RIGHT Column */}
        <div className="post-sidebar">
          <div className="box publish-box">
            <h4>Publish</h4>
            <button type="submit" className="publish-button" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Publish'}
            </button>
          </div>

          <div className="box">
            <h4>Category</h4>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="category-select"
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
          </div>

          <div className="box">
            <h4>Tags</h4>
            <div className="tag-input-box">
              <input
                type="text"
                placeholder="Type a tag and click Add"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button type="button" onClick={handleAddTag}>
                Add
              </button>
            </div>
            <div className="tag-list">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    ✕
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
