import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export default async function SportsNewsDetail({ params }: Props) {
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!post || error) return notFound();

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <img
        src={post.featured_image}
        alt="Featured"
        style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{post.title}</h1>
      <div
        style={{ fontSize: '16px', color: '#444' }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
}
