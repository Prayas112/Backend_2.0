import React, { useState } from "react";
import { FollowFeature } from "../../followFeatures/component/Followfeature";
import { useFollow } from "../../followFeatures/hook/useFollow";
import { useAuth } from "../../auth/hooks/useAuth";

const Post = ({ user, post, handlelikepost, handleunlikepost }) => {
  const [liked, setLiked] = useState(post?.isLiked || false);
  const [saved, setSaved] = useState(false);
  
  const { handlefollowuser, handleunfollowuser } = useFollow();

  const [isFollowing, setIsFollowing] = useState(post?.isFollowing || false);





  // ================= CURRENT USER =================

  const { user: currentUser } = useAuth();

  // Check: kya ye current user ki khud ki post hai?
  const isOwnPost = currentUser?.username === user?.username;


  

  return (
    <article
      style={{
        width: "360px",
        maxWidth: "92vw",
        margin: "0 auto 24px",
        backgroundColor: "#111318",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "14px",
          gap: "10px",
        }}
      >
        {/* PROFILE IMAGE */}

        <img
          src={
            user?.profileImage ||
            "https://ui-avatars.com/api/?name=User&background=6366f1&color=ffffff&size=128"
          }
          alt="profile"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />

        {/* USERNAME */}

        <p
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            flex: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {user?.username || "User"}
        </p>

        {/* FOLLOW */}

        {!isOwnPost && user?.username &&  (
          <FollowFeature
            username={user.username}
            isFollowing={isFollowing}
            handlefollowuser={async (username) => {
              await handlefollowuser(username);
              setIsFollowing(true);
            }}
            handleunfollowuser={async (username) => {
              await handleunfollowuser(username);
              setIsFollowing(false);
            }}
          />
        )}
      </div>

      {/* ================= POST IMAGE ================= */}

      <div
        style={{
          width: "100%",
          height: "650px",
          backgroundColor: "#08090d",
          overflow: "hidden",
        }}
      >
        <img
          src={
            post?.imgurl ||
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
          }
          alt="post"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      {/* ================= ACTIONS ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 16px 8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {/* LIKE */}

          <button
            type="button"
            onClick={() => {
              post.isLiked
                ? handleunlikepost(post._id)
                : handlelikepost(post._id);
            }}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill={post.isLiked ? "#ef4444" : "none"}
              stroke={post.isLiked ? "#ef4444" : "#ffffff"}
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>

          {/* COMMENT */}

          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75h6.75m-6.75 3h4.5m-9.75 1.5c0 1.43.67 2.703 1.714 3.525L3.75 21l3.46-1.038A8.96 8.96 0 0 0 12 21c4.97 0 9-3.582 9-8s-4.03-8-9-8-9 3.582-9 8Z"
              />
            </svg>
          </button>

          {/* SHARE */}

          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.5 19.5 4l-4.5 16-4-6-6.5-1.5Z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 14 19.5 4"
              />
            </svg>
          </button>
        </div>

        {/* SAVE */}

        <button
          type="button"
          onClick={() => setSaved(!saved)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill={saved ? "#ffffff" : "none"}
            stroke="#ffffff"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.5L6 21V4.75Z"
            />
          </svg>
        </button>
      </div>

      {/* ================= CAPTION ================= */}

      <div
        style={{
          padding: "8px 16px 18px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#d1d5db",
            fontSize: "13px",
            lineHeight: "1.6",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontWeight: "600",
              marginRight: "6px",
            }}
          >
            {user?.username || "User"}
          </span>

          {post?.caption || ""}
        </p>
      </div>
    </article>
  );
};

export default Post;
