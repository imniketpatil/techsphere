import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../hooks/FetchData";
import "../scss/FavouritesList.scss";
import Loading from "./Loading";
import { addRecentId } from "../utils/addRecentId";

function FavouritesList() {
  const storedIdsString = localStorage.getItem("ids");
  const formattedIds = storedIdsString?.replace(/[\[\]"]/g, "") || "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["FavouritesSongsList"],
    queryFn: () => fetchData(`https://saavn.dev/api/songs/${formattedIds}`),
    enabled: !!formattedIds, // Ensure query doesn't run if formattedIds is empty
  });

  const songs = data?.data || [];

  const formatDuration = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClick = (id) => {
    addRecentId(id);
    localStorage.setItem("currentSongId", id);
  };

  // Memoize the songs list rendering
  const renderedSongs = useMemo(() => {
    if (songs.length === 0) {
      return <p>No songs found</p>;
    }

    return (
      <ul>
        {songs.map((song, index) => (
          <li
            className="track-item"
            key={index}
            onClick={() => handleClick(song.id)}
          >
            <div className="track-details">
              <img
                src={song.image[2]?.url || "default-album.png"} // Default image if unavailable
                alt={song.name}
                className="album-art"
              />
              <div className="track-info">
                <p className="track-name">{song.name}</p>
                <p className="track-artist">
                  {song.artists.all[0]?.name || "Unknown Artist"}
                </p>
              </div>
            </div>
            <p className="track-duration">{formatDuration(song.duration)}</p>
          </li>
        ))}
      </ul>
    );
  }, [songs]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return <div className="track-list scrollable">{renderedSongs}</div>;
}

export default FavouritesList;
