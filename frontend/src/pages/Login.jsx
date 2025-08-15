import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-hot-toast";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Always clear old errors on a new attempt

    // --- ENHANCED VALIDATION ---
    if (!username || !password) {
      const errorMessage = "Please enter both username and password.";
      toast.error(errorMessage);
      setError(errorMessage); // Set the on-screen error
      return; // Stop the function here
    }

    setIsLoading(true);

    try {
      const response = await api.post("/api/token/", { username, password });
      const { access, refresh } = response.data;
      const decodedToken = jwtDecode(access);
      const role = decodedToken.role?.trim().toUpperCase();

      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);
      localStorage.setItem("role", role);

      toast.success("Login successful!");

      let destination = null;
      if (role === "ADMIN" || role === "OBSERVER") {
        destination = "/admin-dashboard";
      } else if (role === "CLIENT") {
        destination = "/client-dashboard";
      } else if (role === "TECHNICIAN") {
        destination = "/technician-dashboard";
      }

      if (destination) {
        navigate(destination);
      } else {
        const errorMessage = "Unsupported user role.";
        toast.error(errorMessage);
        setError(errorMessage);
        localStorage.clear();
      }
    } catch (err) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      if (err.response) {
        errorMessage =
          err.response.data?.detail || "Invalid username or password.";
      } else if (err.request) {
        errorMessage =
          "Could not connect to the server. Please check your connection.";
      }
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    toast("Forgot password feature is coming soon!", { icon: "ℹ️" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="relative w-full max-w-6xl min-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="relative flex w-full lg:w-1/2 items-center justify-center bg-gradient-to-br from-blue-500 to-teal-400 p-12 text-white">
          <div className="text-center relative z-10">
            <ShieldCheck
              size={72}
              className="mx-auto h-28 w-28 text-white mb-6 opacity-90"
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              ResolveFlow
            </h1>
            <p className="mt-4 text-lg sm:text-xl font-medium opacity-80 max-w-md mx-auto">
              From issue to resolution, effortlessly.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to continue to your account
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                  autoComplete="username"
                />
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  required
                  autoComplete="current-password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 mt-7"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>

              <div className="flex items-center justify-end text-sm">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                >
                  Forgot your password?
                </button>
              </div>

              {/* --- THIS IS THE FINAL PIECE YOU WERE MISSING --- */}
              {error && (
                <p className="text-center text-sm text-red-600 -my-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 text-lg font-semibold text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
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