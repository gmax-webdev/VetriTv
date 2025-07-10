// src/app/admin/add-post/page.tsx

import AddPostForm from './/AddPostForm';

export default function AddPostPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Post</h1>
      <AddPostForm />
    </div>
  );
}
