// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/lib/supabaseClient';
// import './login.css';

// export default function LoginPage() {
//   const router = useRouter();

//   const [isSignup, setIsSignup] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('updater');
//   const [error, setError] = useState('');
//   const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

//   // Fetch logged in user and check role
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (data?.user) {
//         const role = data.user.user_metadata?.role;
//         setCurrentUserRole(role);
//       }
//     };
//     fetchUser();
//   }, []);

//   // 🔒 LOGIN handler
//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const email = `${username.toLowerCase()}@vettritv.lk`;

//     try {
//       const { data, error: loginError } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (loginError) {
//         setError(loginError.message);
//         return;
//       }

//       const role = data.user?.user_metadata?.role;

//       if (role === 'admin') {
//         router.push('/superadmin/dashboard');
//       } else if (role === 'updater') {
//         router.push('/admin/dashboard');
//       } else {
//         setError('Unauthorized role');
//       }
//     } catch (error: any) {
//       setError(error.message || 'Login failed');
//     }
//   };

//   // 🛠️ SIGNUP handler (only for superadmin)
//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     const email = `${username.toLowerCase()}@vettritv.lk`;

//     try {
//       const { data, error: signUpError } = await supabase.auth.admin.createUser({
//         email,
//         password,
//         user_metadata: {
//           username,
//           name,
//           role,
//         },
//       });

//       if (signUpError) {
//         setError(signUpError.message);
//         return;
//       }

//       // Optional: Add to profiles table
//       await supabase.from('profiles').insert([
//         {
//           id: data.user?.id,
//           name: name,
//         },
//       ]);

//       alert('✅ User created successfully!');
//       setIsSignup(false);
//       setUsername('');
//       setPassword('');
//       setName('');
//     } catch (error: any) {
//       setError(error.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={isSignup ? handleSignup : handleLogin} className="login-form">
//         <h2>{isSignup ? 'Super Admin - Add New User' : 'Log In to Vettri TV'}</h2>

//         {/* Show Full Name only in signup */}
//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           minLength={6}
//         />

//         {isSignup && (
//           <select value={role} onChange={(e) => setRole(e.target.value)} required>
//             <option value="updater">News Updater</option>
//             <option value="admin">Admin</option>
//           </select>
//         )}

//         {error && <p className="error">{error}</p>}

//         <button type="submit">{isSignup ? 'Create User' : 'Log In'}</button>

//         {/* Only show signup toggle if current user is admin */}
//         {!isSignup && currentUserRole === 'admin' && (
//           <p className="toggle">
//             Want to create new user?{' '}
//             <button
//               type="button"
//               onClick={() => {
//                 setError('');
//                 setIsSignup(true);
//               }}
//               className="toggle-btn"
//             >
//               Sign Up
//             </button>
//           </p>
//         )}

//         {isSignup && (
//           <p className="toggle">
//             Already done?{' '}
//             <button
//               type="button"
//               onClick={() => {
//                 setError('');
//                 setIsSignup(false);
//               }}
//               className="toggle-btn"
//             >
//               Go back to Login
//             </button>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
