import { supabase } from '@/lib/supabaseClient';

export default async function handler(req:any, res:any) {
  // Step 1: Fetch all posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*');

  if (postsError) {
    return res.status(500).json({ error: postsError.message });
  }

  // Step 2: Fetch all comments
  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('post_id');

  if (commentsError) {
    return res.status(500).json({ error: commentsError.message });
  }

  // Step 3: Count comments for each post
  const commentCountMap = comments.reduce((acc, comment) => {
    acc[comment.post_id] = (acc[comment.post_id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Step 4: Add comment count to each post
  const postsWithCommentCounts = posts.map((post) => ({
    ...post,
    comments: commentCountMap[post.id] || 0,
  }));

  res.status(200).json(postsWithCommentCounts);
}
