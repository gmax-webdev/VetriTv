'use client';

import AddPostForm from '@/app/admin/add-post/AddPostForm';

export default function SuperAdminAddPostPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Add New Post (SuperAdmin)</h1>
      <AddPostForm />
    </div>
  );
}
