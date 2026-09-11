import { useState, useRef } from "react";
import { usePost } from "../hook/usePost";
import { useNavigate } from "react-router";

const CreatePost = () => {
  const [caption, setcaption] = useState("");

  const postimageinputfieldref = useRef(null);

  const { loading, handlecreatepost, progress } = usePost();

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    const file = postimageinputfieldref.current.files[0];

    await handlecreatepost(file, caption);
    navigate("/");
  }

  if (loading) {
  return (
    <main className="min-h-screen bg-[#08090d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#111318] border border-white/10 rounded-2xl p-6">

        <div className="flex justify-between items-center mb-3">
          <p className="text-white text-sm font-semibold">
            Processing your post...
          </p>

          <p className="text-indigo-400 text-sm font-semibold">
            {progress}%
          </p>
        </div>

        <div className="w-full h-2 bg-[#191c23] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-200"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="text-gray-500 text-xs mt-3 text-center">
          Please wait while your post is being uploaded
        </p>

      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#08090d] px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white text-sm mb-5 transition cursor-pointer"
          >
            ← Back to Feed
          </button>

          <h1 className="text-3xl font-bold text-white">Create Post</h1>

          <p className="text-sm text-gray-500 mt-1">
            Share something with your followers
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111318] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/30">
          <form onSubmit={handlesubmit} className="space-y-5">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Post Image
              </label>

              <label
                htmlFor="postImage"
                className="h-52 sm:h-64 w-full rounded-xl border border-dashed border-white/15 bg-[#191c23] hover:border-indigo-500/50 hover:bg-[#1b1e27] transition cursor-pointer flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
                  <span className="text-2xl text-indigo-400">+</span>
                </div>

                <p className="text-sm font-medium text-gray-300">
                  Select an image
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or other image
                </p>
              </label>

              <input
                ref={postimageinputfieldref}
                id="postImage"
                hidden
                type="file"
                name="file"
                accept="image/*"
              />
            </div>

            {/* Caption */}
            <div>
              <label
                htmlFor="caption"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Caption
              </label>

              <textarea
                id="caption"
                value={caption}
                onChange={(e) => {
                  setcaption(e.target.value);
                }}
                name="text"
                placeholder="Write something about your post..."
                rows="4"
                className="w-full resize-none rounded-xl bg-[#191c23] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/10 transition"
              />
            </div>

            {/* Create Button */}
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.98] transition cursor-pointer"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreatePost;
