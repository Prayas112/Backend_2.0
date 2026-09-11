import React from "react";

export const FollowFeature = ({
  username,
  isFollowing,
  handlefollowuser,
  handleunfollowuser,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        flexShrink: 0,
      }}
    >
      <button
        type="button"
        onClick={() => {
          isFollowing
            ? handleunfollowuser(username)
            : handlefollowuser(username);
        }}
        style={{
          padding: "5px 10px",
          borderRadius: "7px",
          border: isFollowing ? "1px solid rgba(255,255,255,0.15)" : "none",
          backgroundColor: isFollowing ? "#252832" : "#6366f1",
          color: "#ffffff",
          fontSize: "11px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};
