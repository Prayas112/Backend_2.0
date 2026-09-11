import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Nav from "../../shared/component/Nav";

import Post from "../components/Post";
import { usePost } from "../hook/usePost";


const Feed = () => {
  const { feed, loading, handlegetfeed ,handlelikepost, handleunlikepost } = usePost();
  const navigate = useNavigate()

  useEffect(() => {
    handlegetfeed();
  }, []);

  if (loading || !feed) {
    return (
      <main className="min-h-screen bg-[#08090d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>

          <p className="text-gray-400 mt-4">Loading your feed...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] relative overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-[-150px] left-[-150px] w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="fixed bottom-[-150px] right-[-150px] w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Feed */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 pt-28 pb-8">
        {/* Feed Header */}

        <Nav />

        {/* Posts */}
        <div className="flex flex-col gap-6">
          {feed.length > 0 ? (
            feed.map((post) => (
              <Post
                key={post._id}
                user={post.user}
                post={post}
                loading={loading}
                handlelikepost={handlelikepost}
                handleunlikepost={handleunlikepost}
              />
            ))
          ) : (
            <div className="bg-[#111318] border border-white/10 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">✦</div>

              <h2 className="text-white font-semibold text-lg">No posts yet</h2>

              <p className="text-gray-500 text-sm mt-2">
                Follow some users or create your first post.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
