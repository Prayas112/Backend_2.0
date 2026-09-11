import { useNavigate } from "react-router";
import { usePost } from "../../posts/hook/usePost";
import { useAuth } from "../../auth/hooks/useAuth";

const Nav = () => {
  const navigate = useNavigate();
  const { handlegetfeed } = usePost();
  const {user, handlelogout} = useAuth()
  const handleLogout = async () => {
    await handlelogout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-20px)] max-w-2xl">
      <div className="bg-[#111318]/95 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-2 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between gap-3">
          {/* Header */}
          <div className="min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold text-white truncate">
              Your Feed
            </h1>

            <p className="hidden sm:block text-sm text-gray-500 mt-1">
              See what's happening around you
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 shrink-0 ">
            {/* Create Post */}
            <button
              type="button"
              onClick={() => navigate("/create-post")}
              className="cursor-pointer w-20 sm:w-24 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] sm:text-xs font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-95 transition flex items-center justify-center text-center"
            >
              + Create
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={handlegetfeed}
              className="cursor-pointer w-20 sm:w-24 h-11 rounded-xl bg-[#191c23] border border-white/10 text-gray-300 text-[11px] sm:text-xs font-semibold hover:text-white hover:border-indigo-500/50 active:scale-95 transition flex items-center justify-center"
            >
              ↻ Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300
             border border-white/10
             bg-[#111318]
             hover:bg-red-500/10
             hover:text-red-400
             hover:border-red-500/20
             transition-all duration-200
             cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
