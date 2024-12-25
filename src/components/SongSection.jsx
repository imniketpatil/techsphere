import React, { useState } from "react";
import "../scss/SongList.scss";
import Search from "../assets/Search.png";
import { Outlet, useLocation } from "react-router-dom";

const Name = ({ path }) => {
  if (path === "/") return <h1>For You</h1>;
  else if (path === "/TopTracks") return <h1>Top Tracks</h1>;
  else if (path === "/Favourites") return <h1>Favourites</h1>;
  else if (path === "/RecentlyPlayed") return <h1>Recently Played</h1>;
  else return null;
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const SongSection = () => {
  const [text, setText] = useState("Blinding Lights");
  const location = useLocation();

  const hiddenRoutes = ["/TopTracks", "/Favourites", "/RecentlyPlayed"];
  const shouldHide = hiddenRoutes.includes(location.pathname);

  const debouncedSetText = debounce(setText, 300);

  return (
    <div className="song-list">
      <Name path={location.pathname} />
      {!shouldHide && (
        <div className="search-container">
          <input
            id="searchbar"
            type="text"
            name="search"
            placeholder="Search Song, Artist"
            onChange={(e) => debouncedSetText(e.target.value)}
            value={text}
          />
          <img src={Search} alt="Search" className="search-icon" />
        </div>
      )}
      <div>
        <Outlet context={[text]} />
      </div>
    </div>
  );
};

export default SongSection;
