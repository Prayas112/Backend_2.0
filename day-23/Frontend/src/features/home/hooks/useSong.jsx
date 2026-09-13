import { getsong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../Song.Context";

export const useSong = () => {
  const context = useContext(SongContext);
  const { loading, setloading, song, setsong } = context;

  async function handleGetSong({ mood }) {
    setloading(true);
    const response = await getsong({ mood });
    setsong(response.song);
    setloading(false);
  }
  return {
    loading,
    song,
    handleGetSong,
  };
};
