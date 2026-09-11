import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const { user, loading, handlelogin } = useAuth();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    await handlelogin(username, password);
    navigate("/");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <h1 className="text-white text-xl">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Heading */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 mb-4">
            <span className="text-2xl">✦</span>
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="text-gray-400 mt-2 text-sm">
            Login and continue sharing your world.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#111318] border border-white/10 rounded-3xl p-7 shadow-2xl">
          <form onSubmit={handlesubmit} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>

              <input
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                value={username}
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                autoComplete="username"
                className="w-full bg-[#191c23] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none transition duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#191c23] border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 outline-none transition duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />

                {/* Show / Hide */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-purple-500 hover:scale-[1.01] active:scale-[0.98] transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-400 font-semibold hover:text-indigo-300 transition"
            >
              Register
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-5">
          Share • Connect • Discover
        </p>
      </div>
    </main>
  );
};

export default Login;
