import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';
import './slug.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function WorldNewsDetail({ params }: { params: { slug: string } }) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', decodeURIComponent(params.slug)) // decode Tamil/Unicode URLs
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching post:', error);
    return <div>News not found</div>;
  }

  return (
    <div className="single-post">
      <h1>{data.title}</h1>
      {data.featured_image && (
        <Image
          src={data.featured_image}
          alt={data.title}
          width={800}
          height={450}
          className="post-image"
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}
