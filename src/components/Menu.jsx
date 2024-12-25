import React from "react";
import Logo from "../assets/LogoSpotify.png";
import Profile from "../assets/Profile.png";
import "../scss/Menu.scss";
import { useNavigate } from "react-router-dom"; // Correct hook

function Menu() {
  const navigate = useNavigate(); // Use the hook

  return (
    <div className="menu">
      <img src={Logo} alt="Spotify Logo" id="logo" />
      <ul className="menu-items">
        <li>
          <p
            onClick={() => {
              navigate("/"); // Navigate to home page
            }}
          >
            For You
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              navigate("/TopTracks"); // Navigate to home page
            }}
          >
            Top Tracks
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              navigate("/Favourites"); // Navigate to home page
            }}
          >
            Favourites
          </p>
        </li>
        <li>
          <p
            onClick={() => {
              navigate("/RecentlyPlayed"); // Navigate to home page
            }}
          >
            Recently Played
          </p>
        </li>
      </ul>
      <img src={Profile} alt="User profile" id="profile" />
    </div>
  );
}

export default Menu;
