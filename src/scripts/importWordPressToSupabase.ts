import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function run() {
  const res = await fetch('https://vettritv.lk/wp-json/wp/v2/posts?_embed&per_page=20');
  const wpPosts = await res.json();

  for (const post of wpPosts) {
    const title = post.title.rendered;
    const content = post.content.rendered;
    const image_url = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const category = post.categories?.[0]?.toString() || '';

    const { error } = await supabase.from('posts').insert({
      title,
      content,
      image_url,
      category,
      tags: [],
      source: 'wordpress',
    });

    if (error) {
      console.error('Error saving:', title);
    } else {
      console.log('Saved:', title);
    }
  }
}

run();
