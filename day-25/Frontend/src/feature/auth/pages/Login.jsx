
import { Link } from "react-router";
import { useAuth } from '../hook/useAuth';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";

import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const {handlelogin} = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    
    const payload = {
      email,
      password
    }
    await handlelogin(payload)
    navigate('/')

   
  }

  
    if (!loading && user) {
      return <Navigate to="/" replace />;
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

            <p className="text-zinc-400 mt-2">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl
                bg-zinc-950 border border-zinc-800
                text-white placeholder-zinc-600
                outline-none
                focus:border-indigo-500
                focus:ring-2 focus:ring-indigo-500/20
                transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl
                bg-zinc-950 border border-zinc-800
                text-white placeholder-zinc-600
                outline-none
                focus:border-indigo-500
                focus:ring-2 focus:ring-indigo-500/20
                transition"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl
              bg-indigo-600 text-white font-semibold
              hover:bg-indigo-500
              active:scale-[0.98]
              transition-all"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-zinc-400 mt-7">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login
