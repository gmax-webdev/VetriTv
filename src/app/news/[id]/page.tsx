import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import ShareIcons from '@/components/News/ShareIcons';
import CommentForm from '@/components/News/CommentForm';
import './post.css';

interface Props {
  params: { id: string };
}

export default async function PostPage({ params }: Props) {
  const postId = params.id;

  // Fetch post
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  if (!post || error) return notFound();

  // ✅ Increment views
  await supabase
    .from('posts')
    .update({ views: (post.views || 0) + 1 })
    .eq('id', postId);

  const postUrl = `https://vettritv.lk/news/${post.id}`;
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="post-container">
      <div className="post-wrapper">
        <h1 className="post-title">{post.title}</h1>

        <div className="post-meta">
          <span className="author">By {post.author || 'Admin'}</span>
          <span className="dot">•</span>
          <span className="date">{formattedDate}</span>
        </div>

        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="post-image"
          />
        )}

        {/* ✅ Views + Shares Left | ShareIcons Right */}
        <div className="post-meta-bottom">
          <div className="meta-left">
            <span className="views">👁 {post.views + 1} views</span>
            <span className="dot">•</span>
            <span className="shares">🔁 {post.shares || 0} shares</span>
          </div>
          <div className="meta-right">
            <ShareIcons postId={post.id} postUrl={postUrl} />
          </div>
        </div>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <CommentForm postId={post.id} />
      </div>
    </div>
  );
}
