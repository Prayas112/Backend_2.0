import React, { useState } from "react";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

const Login = () => {
  const { loading, handlelogin } = useAuth();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    await handlelogin({ email, password });

    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl">
        {/* LEFT SIDE */}
        <section className="relative hidden w-1/2 overflow-hidden border-r border-white/10 lg:flex">
          {/* Background shapes */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-orange-500/20 blur-[100px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-xl">
                  ♪
                </div>

                <span className="text-xl font-bold tracking-wide">Moodify</span>
              </div>
            </div>

            {/* Center */}
            <div>
              <p className="mb-4 text-sm uppercase tracking-[5px] text-pink-400">
                Music • Mood • You
              </p>

              <h1 className="max-w-lg text-5xl font-bold leading-[1.1]">
                Music that
                <br />
                <span className="text-gray-500">matches your mood.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-gray-500">
                Discover songs based on how you feel. Your mood, your music,
                your moment.
              </p>

              {/* Fake music visualizer */}
              <div className="mt-10 flex h-20 items-center gap-2">
                {[30, 55, 40, 75, 45, 90, 60, 35, 70, 50, 85, 45, 65, 30].map(
                  (height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className={`w-1.5 rounded-full ${
                        index % 3 === 0
                          ? "bg-pink-500"
                          : index % 3 === 1
                            ? "bg-orange-400"
                            : "bg-gray-700"
                      }`}
                    />
                  ),
                )}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Find your sound.</span>
              <span>♪ 2026 Moodify</span>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5">
                ♪
              </div>

              <span className="text-lg font-bold">Moodify</span>
            </div>

            {/* Heading */}
            <div className="mb-10">
              <p className="mb-3 text-xs font-medium uppercase tracking-[3px] text-gray-600">
                Welcome back
              </p>

              <h2 className="text-4xl font-bold tracking-tight">Sign in</h2>

              <p className="mt-3 text-sm text-gray-500">
                Continue listening to your favorite music.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlesubmit}>
              <FormGroup
                value={email}
                onchange={(e) => setemail(e.target.value)}
                label="email"
                placeholder="Enter your email"
              />

              <FormGroup
                value={password}
                onchange={(e) => setpassword(e.target.value)}
                label="password"
                placeholder="Enter your password"
              />

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer group mt-4 flex w-full items-center justify-between rounded-full border border-white/10 bg-white px-5 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>{loading ? "Signing in..." : "Continue"}</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-600">OR</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Register */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-gray-500">Don't have an account?</p>

              <Link
                to="/register"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-pink-400"
              >
                Create your account
                <span>↗</span>
              </Link>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-[11px] text-gray-700">
              By continuing, you agree to Moodify's terms.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
