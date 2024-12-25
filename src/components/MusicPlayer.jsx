import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState, useEffect } from "react";
import { fetchData } from "../hooks/FetchData"; // Reusable Axios function
import ThreeDots from "../assets/FrameThreeDots.png";
import VectorLeft from "../assets/VectorLeft.png";
import VectorNext from "../assets/VectorNext.png";
import VectorPlay from "../assets/VectorPlay.png";
// import VectorPause from "../assets/VectorPause.png";
import VectorVolume from "../assets/VectorVolume.png";
import "../scss/MusicPlayer.scss";
import { addId } from "../utils/addRecentId";
import Loading from "./Loading";

const MusicPlayer = () => {
  const audioRef = useRef(null); // Ref for controlling the audio element
  const [isPlaying, setIsPlaying] = useState(true); // State to toggle play/pause
  const [progress, setProgress] = useState(0); // State for the progress bar
  const [isMuted, setIsMuted] = useState(false); // State for mute/unmute

  const currentSongId = localStorage.getItem("currentSongId") || ZCZ5f7Kd;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["SongPlaying", currentSongId],
    queryFn: () => fetchData(`https://saavn.dev/api/songs/${currentSongId}`),
  });

  // Reset the audio element whenever currentSongId changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setIsPlaying(true);
      setProgress(0);
    }
  }, [currentSongId]);

  // Handle Play Button Click
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Handle Progress Update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100 || 0);
    }
  };

  // Handle Seek
  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = (e.target.value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(e.target.value);
    }
  };

  // Handle Mute/Unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  if (isError) return <div className="error">Error: {error.message}</div>;

  const songData = data?.data?.[0];
  const songUrl = songData?.downloadUrl?.[4]?.url || null;
  const albumArt =
    songData?.image?.[2]?.url ||
    "https://c.saavncdn.com/artists/Dua_Lipa_004_20231120090922_500x500.jpg";
  const songName = songData?.name || "Unknown Song";
  const artistName = songData?.artists?.primary?.[0]?.name || "Unknown Artist";

  const id = data?.data?.[0].id;

  const handleClick = (id) => {
    addId(id);
  };

  return (
    <div className="music-player">
      <div className="music-info">
        <h1 className="song-title">{songName}</h1>
        <h4 className="song-artist">{artistName}</h4>
      </div>
      <div className="poster-container">
        <img
          src={albumArt}
          alt={`${songName} Album Art`}
          className="song-poster"
        />
      </div>
      <div className="progress-bar-div">
        <input
          type="range"
          className="progress-bar"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
        />
      </div>
      {songUrl && (
        <audio
          ref={audioRef}
          src={songUrl}
          preload="metadata"
          autoPlay
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
        />
      )}
      <div className="controls-container">
        <div className="circle" onClick={() => handleClick(id)}>
          <img src={ThreeDots} alt="More" className="icon" />
        </div>
        <div className="playback-controls">
          <img src={VectorLeft} alt="Previous" className="icon" />
          <img
            src={isPlaying ? VectorPlay : VectorPlay}
            alt="Play/Pause"
            className="icon play-icon"
            onClick={handlePlayPause}
          />
          <img src={VectorNext} alt="Next" className="icon" />
        </div>
        <div className="circle">
          <img
            src={VectorVolume}
            alt={isMuted ? "Unmute" : "Mute"}
            className="icon"
            onClick={toggleMute}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
