import FormGroup from "../components/FormGroup";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

const Register = () => {
  const { loading, handleregister } = useAuth();

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    await handleregister({
      email,
      username,
      password,
    });

    navigate("/");
  }

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-5xl items-center">
        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d] lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <div className="relative flex min-h-[260px] flex-col justify-between overflow-hidden bg-[#151515] p-7 sm:p-10 lg:min-h-[650px]">
            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[45px] border-pink-500/10" />

            <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full border-[50px] border-orange-500/10" />

            {/* Logo */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-2xl">◉</span>
                <span className="text-lg font-bold tracking-wide">moodify</span>
              </div>
            </div>

            {/* Text */}
            <div className="relative mt-10">
              <span className="text-xs uppercase tracking-[4px] text-gray-600">
                Create your space
              </span>

              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                Your music.
                <br />
                Your mood.
                <br />
                <span className="text-gray-600">Your account.</span>
              </h1>

              <p className="mt-6 max-w-sm text-sm leading-6 text-gray-500">
                Create an account and let Moodify become your personal
                soundtrack.
              </p>
            </div>

            {/* Bottom */}
            <div className="relative mt-10 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">01</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-gray-600">
                  Join Moodify
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-600">Listen differently.</p>
                <p className="mt-1 text-xs text-gray-600">Feel everything.</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center px-6 py-10 sm:px-12 lg:px-14">
            <div className="w-full max-w-md">
              {/* Heading */}
              <div className="mb-8">
                <p className="text-xs font-medium uppercase tracking-[3px] text-pink-400">
                  New here?
                </p>

                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Create account
                </h2>

                <p className="mt-3 text-sm text-gray-500">
                  It only takes a minute to get started.
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
                  value={username}
                  onchange={(e) => setusername(e.target.value)}
                  label="username"
                  placeholder="Choose a username"
                />

                <FormGroup
                  value={password}
                  onchange={(e) => setpassword(e.target.value)}
                  label="password"
                  placeholder="Create a password"
                />

                {/* Register */}
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer group mt-3 flex w-full items-center justify-between rounded-xl bg-white px-5 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-gray-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>
                    {loading ? "Creating account..." : "Create account"}
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </form>

              {/* Login */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-gray-500">
                  Already have an account?
                </p>

                <Link
                  to="/login"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-pink-400"
                >
                  Sign in
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
