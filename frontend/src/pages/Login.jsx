// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api';
// import { toast } from 'react-hot-toast';
// import { ArrowRight, ShieldCheck } from 'lucide-react';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
// import { jwtDecode } from 'jwt-decode';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!username || !password) {
//             toast.error("Please enter both username and password.");
//             return;
//         }
//         setIsLoading(true);

//         try {
//             const response = await api.post('/api/token/', { username, password });
//             const { access, refresh } = response.data;
//             const decodedToken = jwtDecode(access);
//             const role = decodedToken.role?.trim().toUpperCase();

//             localStorage.setItem(ACCESS_TOKEN, access);
//             localStorage.setItem(REFRESH_TOKEN, refresh);
//             localStorage.setItem("role", role);
            
//             toast.success("Login successful!");
            
//             let destination = null;
//             if (role === 'ADMIN' || role === 'OBSERVER') {
//                 destination = '/admin-dashboard';
//             } else if (role === 'CLIENT') {
//                 destination = '/client-dashboard';
//             } else if (role === 'TECHNICIAN') {
//                 destination = '/technician-dashboard';
//             }

//             if (destination) {
//                 navigate(destination); // The setTimeout is no longer needed.
//             } else {
//                 toast.error("Unsupported user role.");
//                 localStorage.clear();
//             }

//         } catch (err) {
//             console.error('Login failed:', err);
//             let errorMessage = "An unexpected error occurred. Please try again.";
//     if (err.response) {
//         // This is for API errors (like wrong password, user not found)
//         errorMessage = err.response.data?.detail || "Invalid username or password.";
//     } else if (err.request) {
//         // This is for network errors (like server is down)
//         errorMessage = "Could not connect to the server. Please check your connection.";
//     }
//     toast.error(errorMessage);
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     const handleForgotPasswordClick = () => {
//         toast("Forgot password feature is coming soon!", { icon: 'ℹ️' });
//     };

//     return (
//         // Your JSX is fine and does not need to change.
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
//             <div className="relative w-full max-w-6xl min-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
//                 <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 p-12 text-white">
//                     <div className="text-center relative z-10">
//                         <ShieldCheck size={72} className="mx-auto h-28 w-28 text-white mb-6 opacity-90" />
//                         <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">ResolveFlow</h1>
//                         <p className="mt-4 text-lg sm:text-xl font-medium opacity-80 max-w-md mx-auto">From issue to resolution, effortlessly.</p>
//                     </div>
//                 </div>
//                 <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
//                     <div className="w-full max-w-sm">
//                         <div className="text-center mb-8">
//                             <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
//                             <p className="mt-2 text-sm text-gray-600">Sign in to continue to your account</p>
//                         </div>
//                         <form onSubmit={handleLogin} className="space-y-6">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" required autoComplete="username" />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" required autoComplete="current-password" />
//                             </div>
//                             <div className="flex items-center justify-end text-sm">
//                                 <button type="button" onClick={handleForgotPasswordClick} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">Forgot your password?</button>
//                             </div>
//                             <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed">
//                                 {isLoading ? "Signing In..." : "Sign In"}
//                                 {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

// D:\it-admin-tool\frontend\src\pages\Login.jsx (Temporary Debug Version)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-hot-toast';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("1. Login button clicked. handleLogin function started."); // DEBUG

        if (!username || !password) {
            console.error("2. ERROR: Username or password was not provided."); // DEBUG
            toast.error("Please enter both username and password.");
            return;
        }
        setIsLoading(true);
        console.log("3. Form is valid. Preparing to make API call."); // DEBUG

        try {
            console.log("4. Calling api.post to '/api/token/' with username:", username); // DEBUG
            const response = await api.post('/api/token/', { username, password });
            console.log("5. SUCCESS: API call was successful. Response data:", response.data); // DEBUG
            
            const { access, refresh } = response.data;
            const decodedToken = jwtDecode(access);
            console.log("6. Token has been decoded:", decodedToken); // DEBUG

            const role = decodedToken.role?.trim().toUpperCase();
            console.log("7. Role extracted from token:", role); // DEBUG

            localStorage.setItem(ACCESS_TOKEN, access);
            localStorage.setItem(REFRESH_TOKEN, refresh);
            localStorage.setItem("role", role);
            
            toast.success("Login successful!");
            
            let destination = null;
            if (role === 'ADMIN' || role === 'OBSERVER') {
                destination = '/admin-dashboard';
            } else if (role === 'CLIENT') {
                destination = '/client-dashboard';
            } else if (role === 'TECHNICIAN') {
                destination = '/technician-dashboard';
            }

            console.log("8. Based on role, navigating to:", destination); // DEBUG
            if (destination) {
                navigate(destination);
            } else {
                console.error("9. ERROR: Unsupported user role found in token."); // DEBUG
                toast.error("Unsupported user role.");
                localStorage.clear();
            }

        } catch (err) {
            console.error('10. CATCH BLOCK: The API call failed. Full error object:', err); // DEBUG
            let errorMessage = "An unexpected error occurred. Please try again.";
            if (err.response) {
                errorMessage = err.response.data?.detail || "Invalid username or password.";
            } else if (err.request) {
                errorMessage = "Could not connect to the server. Please check your connection.";
            }
            toast.error(errorMessage);
        } finally {
            console.log("11. FINALLY BLOCK: Resetting loading state."); // DEBUG
            setIsLoading(false);
        }
    };
    
    const handleForgotPasswordClick = () => {
        toast("Forgot password feature is coming soon!", { icon: 'ℹ️' });
    };

    // JSX is unchanged
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
            <div className="relative w-full max-w-6xl min-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 p-12 text-white">
                    <div className="text-center relative z-10">
                        <ShieldCheck size={72} className="mx-auto h-28 w-28 text-white mb-6 opacity-90" />
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">ResolveFlow</h1>
                        <p className="mt-4 text-lg sm:text-xl font-medium opacity-80 max-w-md mx-auto">From issue to resolution, effortlessly.</p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                    <div className="w-full max-w-sm">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
                            <p className="mt-2 text-sm text-gray-600">Sign in to continue to your account</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" required autoComplete="username" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200" required autoComplete="current-password" />
                            </div>
                            <div className="flex items-center justify-end text-sm">
                                <button type="button" onClick={handleForgotPasswordClick} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">Forgot your password?</button>
                            </div>
                            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                                {isLoading ? "Signing In..." : "Sign In"}
                                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;