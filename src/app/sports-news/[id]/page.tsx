// import { supabase } from '@/lib/supabaseClient';
// import { notFound } from 'next/navigation';
// import styles from './SportsSection.module.css';

// interface Props {
//   params: { id: string };
// }

// export default async function SportsNewsDetail({ params }: Props) {
//   const { data: post, error } = await supabase
//     .from('posts')
//     .select('*')
//     .eq('id', params.id)
//     .single();

//   if (!post || error) return notFound();

//   return (
//     <div className={styles.sportsSection}>
//       {/* Banner Background */}
//       <div className={styles.bannerContainer}>
//         <img
//           src={post.featured_image}
//           alt="Featured"
//           className={styles.bannerImage}
//         />
//       </div>

//       {/* Floating Content Card */}
//       <div className={styles.contentBox}>
//         <h1 className={styles.heading}>{post.title}</h1>
//         <div
//           className={styles.postContent}
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         ></div>
//       </div>
//     </div>
//   );
// }
