import React, { useMemo } from "react";
import "../scss/SongList.scss";
import { addRecentId } from "../utils/addRecentId";

function SongsList({ songs }) {
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

  // Memoize the rendering of the songs list to prevent unnecessary re-renders
  const renderedSongs = useMemo(() => {
    return songs.length > 0 ? (
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
                  {song.artists.all[0].name || "Unknown Artist"}
                </p>
              </div>
            </div>
            <p className="track-duration">{formatDuration(song.duration)}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No songs found</p>
    );
  }, [songs]); // Only re-run when `songs` changes

  return <>{renderedSongs}</>;
}

export default SongsList;
