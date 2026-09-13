import React from "react";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../component/Player";
import { useSong } from "../hooks/useSong";
import Logout from "../../auth/pages/Logout";

const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
     
      <div
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          zIndex: 50,
        }}
      >
        <Logout />
      </div>

      {/* Camera Section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          // 👇 Logout ke liye upar space
          paddingTop: "65px",
        }}
      >
        <FaceExpression
          onClick={(expression) => {
            handleGetSong({ mood: expression });
          }}
        />
      </div>

      {/* Player */}
      <Player />
    </div>
  );
};

export default Home;
