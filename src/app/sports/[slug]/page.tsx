import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

// ✅ FIXED: Do NOT decode in generateMetadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Sports: ${params.slug}`,
  };
}

// ✅ MAIN PAGE
export default async function Page({ params }: Props) {
  // ✅ Decode only here where it's safe
  const slug = decodeURIComponent(params.slug);

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('category', 'sports')
    .single();

  if (error || !data) return notFound();

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1>{data.title}</h1>
      <img
        src={data.featured_image}
        alt={data.title}
        style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
      />
      <div dangerouslySetInnerHTML={{ __html: data.excerpt }} />
    </div>
  );
}
