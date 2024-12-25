import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../hooks/FetchData";
import Loading from "./Loading";
import { addRecentId } from "../utils/addRecentId";

function RecentlyPlayedList() {
  // Safely retrieve the `ids` from session storage
  const storedIdsString = sessionStorage.getItem("recentids");
  const formattedIds = storedIdsString?.replace(/[\[\]"]/g, "") || "";

  // Fetch data regardless of whether `formattedIds` is valid
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RecentlyPlayedSongsList", formattedIds],
    queryFn: () => fetchData(`https://saavn.dev/api/songs/${formattedIds}`),
    enabled: !!formattedIds, // Disable query if no IDs
  });

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

  // Memoize rendered song list
  const renderedSongs = useMemo(() => {
    if (!formattedIds) {
      return <p>No songs found. Please add some songs to your list.</p>;
    }

    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return <p>Error: {error.message}</p>;
    }

    const songs = data?.data || [];

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
                src={song.image[2]?.url || "default-album.png"}
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
  }, [formattedIds, isLoading, isError, error, data]);

  return <div className="track-list scrollable">{renderedSongs}</div>;
}

export default RecentlyPlayedList;
