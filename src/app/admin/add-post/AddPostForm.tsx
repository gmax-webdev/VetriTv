'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import QuillEditor from '@/components/Admin/QuillEditor';

export default function AddPostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [format, setFormat] = useState('standard');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let image_url = '';
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(fileName, imageFile);

      if (data) {
        image_url = supabase.storage
          .from('news-images')
          .getPublicUrl(data.path).data.publicUrl;
      } else {
        console.error('Image upload failed:', error);
      }
    }

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        image_url,
        tags: tags.split(',').map(t => t.trim()),
        category,
        format,
      },
    ]);

    setLoading(false);
    if (!error) {
      alert('Post added!');
      setTitle('');
      setContent('');
      setTags('');
      setCategory('');
      setImageFile(null);
    } else {
      console.error('Post insert error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
      <input
        type="text"
        placeholder="Add title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      {/* Fixed ReactQuill usage */}
      <QuillEditor value={content} onChange={setContent} />

      <div>
        <label>Featured Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <label>Category:</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Top">Top</option>
          <option value="World News">World News</option>
          <option value="News Line">News Line</option>
          <option value="Updates">Updates</option>
        </select>
      </div>

      <div>
        <label>Tags (comma separated):</label>
        <input value={tags} onChange={e => setTags(e.target.value)} />
      </div>

      <div>
        <label>Format:</label>
        <label>
          <input
            type="radio"
            name="format"
            value="standard"
            checked={format === 'standard'}
            onChange={() => setFormat('standard')}
          />{' '}
          Standard
        </label>
        <label>
          <input
            type="radio"
            name="format"
            value="image"
            onChange={() => setFormat('image')}
          />{' '}
          Image
        </label>
        <label>
          <input
            type="radio"
            name="format"
            value="video"
            onChange={() => setFormat('video')}
          />{' '}
          Video
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  );
}
