import { createClient } from '@supabase/supabase-js';

// 🔁 Replace with your Supabase project credentials:
const supabase = createClient(
  'https://your-project.supabase.co',
  'YOUR_SERVICE_ROLE_KEY' // Never expose this in frontend
);

async function createUsers() {
  // Create Super Admin
  const { data: superAdmin, error: err1 } = await supabase.auth.admin.createUser({
    email: 'superadmin@vettritv.lk',
    password: 'Vettritv123',
    email_confirm: true
  });

  if (err1) {
    console.error('❌ SuperAdmin creation failed:', err1.message);
  } else {
    await supabase.from('profiles').insert({
      id: superAdmin.user.id,
      username: 'superadmin',
      role: 'super_admin'
    });
    console.log('✅ Super Admin created');
  }

  // Create News Updater
  const { data: updater, error: err2 } = await supabase.auth.admin.createUser({
    email: 'newsupdater@vettritv.lk',
    password: 'Vettritv456',
    email_confirm: true
  });

  if (err2) {
    console.error('❌ NewsUpdater creation failed:', err2.message);
  } else {
    await supabase.from('profiles').insert({
      id: updater.user.id,
      username: 'newsupdater',
      role: 'admin'
    });
    console.log('✅ News Updater created');
  }
}

createUsers();
