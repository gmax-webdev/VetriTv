// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabaseClient';
// import './SignupForm.css';

// export default function SuperAdminSignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMsg('');

//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//     });

//     setLoading(false);

//     if (error) {
//       setErrorMsg(error.message || 'Signup failed');
//       return;
//     }

//     // ✅ Optional: insert into your roles table if needed here

//     // ✅ Redirect after signup
//     router.push('/superadmin/dashboard');
//   };

//   return (
//     <div className="signup-container">
//       <form className="signup-form" onSubmit={handleSignup}>
//         <h2>SuperAdmin Signup</h2>

//         {errorMsg && <p className="error-message">{errorMsg}</p>}

//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="admin@example.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           placeholder="Enter secure password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? 'Creating...' : 'Sign Up'}
//         </button>
//       </form>
//     </div>
//   );
// }
