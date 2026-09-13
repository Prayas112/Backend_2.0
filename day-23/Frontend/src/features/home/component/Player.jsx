import React, { useRef, useState, useEffect } from "react";
import { useSong } from "../hooks/useSong";

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (isNaN(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);

  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${secs}`;
};

const Player = () => {
  const { song } = useSong();

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSpeed, setShowSpeed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // New song
  useEffect(() => {
    if (!audioRef.current || !song?.url) return;

    audioRef.current.pause();
    audioRef.current.load();

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [song?.url]);

  // Play / Pause
  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Skip
  const skip = (seconds) => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      duration,
    );
  };

  // Time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Metadata
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Progress click
  const handleProgressClick = (e) => {
    const bar = progressRef.current;
    const audio = audioRef.current;

    if (!bar || !audio || !duration) return;

    const rect = bar.getBoundingClientRect();

    const percentage = (e.clientX - rect.left) / rect.width;

    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Speed
  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);

    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }

    setShowSpeed(false);
  };

  // Volume
  const handleVolume = (e) => {
    const newVolume = Number(e.target.value);

    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }

    setIsMuted(newVolume === 0);
  };

  // Mute
  const toggleMute = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isMuted) {
      const newVolume = volume || 0.5;

      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Song ended
  const handleSongEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  if (!song) return null;

  return (
    <div
      className="
        fixed
        bottom-2
        left-1/2
        z-50
        w-[calc(100%-20px)]
        max-w-6xl
        -translate-x-1/2
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#090909]
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        sm:bottom-4
        sm:w-[calc(100%-16px)]
        sm:rounded-[28px]
      "
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={song.posterurl}
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            scale-110
            object-cover
            opacity-30
            blur-2xl
          "
        />

        <div className="absolute inset-0 bg-black/70" />

        <div
          className="
            absolute
            -left-20
            top-1/2
            h-64
            w-64
            -translate-y-1/2
            rounded-full
            bg-pink-600/20
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            -right-20
            top-0
            h-60
            w-60
            rounded-full
            bg-orange-500/15
            blur-[100px]
          "
        />
      </div>

      {/* Audio */}
      <audio
        ref={audioRef}
        src={song.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnd}
      />

      {/* Main Content */}
      <div className="relative z-10 p-2.5 sm:p-5">
        {/* Song Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Poster */}
          <div className="relative shrink-0">
            <img
              src={song.posterurl}
              alt={song.title}
              className="
                h-12
                w-12
                rounded-xl
                object-cover
                shadow-xl
                ring-1
                ring-white/20
                sm:h-20
                sm:w-20
                sm:rounded-2xl
              "
            />

            {/* Playing animation */}
            {isPlaying && (
              <div
                className="
                  absolute
                  bottom-1
                  left-1/2
                  flex
                  h-5
                  -translate-x-1/2
                  items-end
                  gap-[2px]
                  rounded-full
                  bg-black/70
                  px-2
                  py-1
                  backdrop-blur
                "
              >
                <span className="h-2 w-[2px] animate-pulse rounded-full bg-pink-400" />
                <span className="h-3 w-[2px] animate-pulse rounded-full bg-orange-400" />
                <span className="h-2.5 w-[2px] animate-pulse rounded-full bg-pink-400" />
                <span className="h-3.5 w-[2px] animate-pulse rounded-full bg-orange-400" />
              </div>
            )}
          </div>

          {/* Song Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className="
                  rounded-full
                  border
                  border-pink-400/20
                  bg-pink-500/10
                  px-2
                  py-0.5
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-pink-300
                  sm:py-1
                  sm:text-[9px]
                "
              >
                {song.mood}
              </span>

              <span className="text-[8px] text-gray-600 sm:text-[9px]">
                NOW PLAYING
              </span>
            </div>

            <h3
              className="
                mt-1
                truncate
                text-xs
                font-semibold
                text-white
                sm:mt-2
                sm:text-lg
              "
            >
              {song.title}
            </h3>

            <p
              className="
                mt-0.5
                text-[9px]
                text-gray-500
                sm:mt-1
                sm:text-[10px]
              "
            >
              Moodify • Your current vibe
            </p>
          </div>

          {/* Desktop Speed */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-2
                text-[10px]
                text-gray-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              {speed}×
            </button>

            {showSpeed && (
              <div
                className="
                  absolute
                  bottom-11
                  right-0
                  z-50
                  w-20
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111111]
                  p-1.5
                  shadow-2xl
                "
              >
                {SPEED_OPTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSpeedChange(item)}
                    className={`
                      w-full
                      rounded-xl
                      px-2
                      py-2
                      text-[10px]
                      transition
                      ${
                        item === speed
                          ? "bg-white/10 text-white"
                          : "text-gray-500 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    {item}×
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-2 sm:mt-5">
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="
              group
              relative
              h-1
              w-full
              cursor-pointer
              rounded-full
              bg-white/10
              sm:h-1.5
            "
          >
            <div
              className="
                absolute
                left-0
                top-0
                h-full
                rounded-full
                bg-gradient-to-r
                from-pink-500
                via-fuchsia-400
                to-orange-400
              "
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="
                absolute
                top-1/2
                h-3
                w-3
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white
                opacity-0
                shadow-lg
                transition
                group-hover:opacity-100
              "
              style={{
                left: `${progress}%`,
              }}
            />
          </div>

          <div className="mt-1 flex justify-between sm:mt-2">
            <span className="text-[8px] text-gray-500 sm:text-[9px]">
              {formatTime(currentTime)}
            </span>

            <span className="text-[8px] text-gray-500 sm:text-[9px]">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div
          className="
            mt-0.5
            flex
            items-center
            justify-between
            sm:mt-2
          "
        >
          {/* Mobile Speed */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-2.5
                py-1
                text-[8px]
                text-gray-400
              "
            >
              {speed}×
            </button>

            {showSpeed && (
              <div
                className="
                  absolute
                  bottom-8
                  left-0
                  z-50
                  w-16
                  rounded-xl
                  border
                  border-white/10
                  bg-[#111111]
                  p-1
                "
              >
                {SPEED_OPTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSpeedChange(item)}
                    className={`
                      w-full
                      rounded-lg
                      px-2
                      py-1.5
                      text-[9px]
                      ${
                        item === speed
                          ? "bg-white/10 text-white"
                          : "text-gray-500"
                      }
                    `}
                  >
                    {item}×
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Back 5 */}
            <button
              onClick={() => skip(-5)}
              className="
                flex
                items-center
                gap-1
                text-gray-500
                transition
                hover:text-white
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M1 4v6h6" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.6" />
              </svg>

              <span className="text-[7px] sm:text-[8px]">5</span>
            </button>

            {/* Play */}
            <button
              onClick={togglePlay}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                shadow-[0_0_25px_rgba(255,255,255,0.15)]
                transition
                duration-200
                hover:scale-110
                active:scale-90
                sm:h-12
                sm:w-12
              "
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />

                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 h-4 w-4 sm:h-5 sm:w-5"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              )}
            </button>

            {/* Forward 5 */}
            <button
              onClick={() => skip(5)}
              className="
                flex
                items-center
                gap-1
                text-gray-500
                transition
                hover:text-white
              "
            >
              <span className="text-[7px] sm:text-[8px]">5</span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4 sm:h-5 sm:w-5"
              >
                <path d="M23 4v6h-6" />
                <path d="M20.49 15a9 9 0 1 1-.49-3.6" />
              </svg>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={toggleMute}
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                text-gray-500
                transition
                hover:bg-white/5
                hover:text-white
                sm:h-8
                sm:w-8
              "
            >
              {isMuted || volume === 0 ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                >
                  <path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.99 7.86-7 8.77v2.06c4.01-.91 7-4.49 7-8.77s-2.99-8.77-7-8.77z" />
                </svg>
              )}
            </button>

            {/* Desktop volume slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="
                hidden
                w-16
                cursor-pointer
                accent-pink-500
                sm:block
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
