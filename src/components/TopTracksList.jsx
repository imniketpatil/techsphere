import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchData } from "../hooks/FetchData";
import "../scss/TopTracks.scss";
import SongsList from "./SongsList";
import Loading from "./Loading";

function TopTracks() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SongPlaying"], // Unique query key
    queryFn: () =>
      fetchData("https://saavn.dev/api/search/songs?query=Believer"), // Fetch function
    // staleTime: Infinity,
  });
  // console.log(data);

  const formatDuration = (seconds) => {
    if (!seconds) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const songs = data?.data?.results || [];

  return (
    <div className="track-list scrollable">
      <SongsList songs={songs} />
    </div>
  );
}

export default TopTracks;
