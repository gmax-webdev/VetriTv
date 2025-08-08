// scripts/migrateWordPressToSupabase.ts
import { createClient } from '@supabase/supabase-js';

// ✅ Replace these with your real Supabase project credentials
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-service-role-key';

const supabase = createClient(supabaseUrl, supabaseKey);

// 🔄 Fetch posts from WordPress REST API
const fetchWordPressPosts = async () => {
  const res = await fetch('https://vettritv.lk/wp-json/wp/v2/posts?per_page=100&_embed');
  const posts = await res.json();
  return posts;
};

// ⬇️ Migrate each post to Supabase
const migratePosts = async () => {
  const wpPosts = await fetchWordPressPosts();

  for (const post of wpPosts) {
    const title = post.title.rendered;
    const content = post.content.rendered;
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
    const categories = post.categories || [];
    const tags = post.tags || [];
    const createdAt = post.date;

    // ❌ Check for duplicate by title
    const { data: existing, error: existingError } = await supabase
      .from('posts')
      .select('id')
      .eq('title', title)
      .maybeSingle();

    if (existing) {
      console.log(`⏭️ Skipping (already exists): ${title}`);
      continue;
    }

    // ✅ Insert into Supabase
    const { error } = await supabase.from('posts').insert({
      title,
      content,
      category: categories.join(','),  // Combine array to string
      tags: tags.map(String),          // Ensure tags are string[]
      featured_image: featuredImage,
      created_at: createdAt,
    });

    if (error) {
      console.error(`❌ Error inserting "${title}":`, error);
    } else {
      console.log(`✅ Migrated: ${title}`);
    }
  }
};

migratePosts();
