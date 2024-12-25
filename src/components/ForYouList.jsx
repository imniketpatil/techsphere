import React, { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../hooks/FetchData";
import { addRecentId } from "../utils/addRecentId";

function ForYouList() {
  const [text] = useOutletContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SongPlaying", text],
    queryFn: () => fetchData(`https://saavn.dev/api/search?query=${text}`),
  });

  const album = useMemo(() => data?.data?.songs?.results || [], [data]);

  const formatDuration = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const renderedSongs = useMemo(() => {
    if (text === "") {
      return (
        <div className="no-data">
          <p>Search For Music</p>
        </div>
      );
    }
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return (
        <div>
          <p className="error-message">
            Oops! Something went wrong:{" "}
            {error?.message || "Please try again later."}
          </p>
        </div>
      );
    }

    const handleClick = (id) => {
      addRecentId(id);
      localStorage.setItem("currentSongId", id);
    };

    if (album.length === 0) {
      return (
        <div className="no-data">
          <p>No songs found. Try searching for something else!</p>
        </div>
      );
    }

    return (
      <ul>
        {album.map((song, index) => (
          <li
            className="track-item"
            key={index}
            onClick={() => handleClick(song.id)}
          >
            <div className="track-details">
              <img
                src={song.image[2]?.url}
                alt={song.name}
                className="album-art"
              />
              <div className="track-info">
                <p className="track-name">{song.title}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }, [album, isLoading, isError]);

  return <div className="track-list scrollable">{renderedSongs}</div>;
}

export default ForYouList;
