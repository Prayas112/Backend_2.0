import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const expression = detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });

    console.log(expression);
    onClick(expression);
  }

  return (
    <div className="w-screen px-4 pt-5 pb-28 sm:pt-6">
      {/* Camera */}
      <div className="mx-auto w-full max-w-[400px]">
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-black
            shadow-xl
          "
        >
          {/* Camera label */}
          <div
            className="
              absolute
              left-3
              top-3
              z-10
              rounded-full
              bg-black/60
              px-3
              py-1
              text-xs
              text-white
              backdrop-blur
            "
          >
            <span className="mr-1.5 text-pink-500">●</span>
            Camera
          </div>

          <video
            ref={videoRef}
            playsInline
            className="
              block
              h-[280px]
              w-full
              object-cover
              sm:h-[340px]
              lg:h-[220px]
            "
            style={{
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>

      {/* Mood */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-xs uppercase tracking-widest text-gray-400">
          Current Mood
        </p>

        <p className="mt-1 text-lg font-semibold capitalize text-pink-500">
          {expression}
        </p>

        <button
          onClick={handleClick}
          className="
            mt-3
            rounded-full
            bg-gradient-to-r
            from-pink-500
            to-orange-500
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-pink-500/20
            transition
            hover:scale-105
            active:scale-95
          "
        >
          Detect Expression
        </button>
      </div>
    </div>
  );
}
