import BannerSection from "../BannerSection";
import Header from "../Header";
import VideosHome from "../VideosHome";
import "./index.css";
import { useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [usersSearch, setUsersSearch] = useState("");
  const [wantedSearch, setWantedSearch] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const closeBanner = (value) => setShowBanner(value);
  const onChangeUsersSearch = (event) => {
    setUsersSearch(event.target.value);
  };

  const onClickSearchVideosButton = () => {
    setWantedSearch(usersSearch);
  };
  const clickRetry = () => {
    setUsersSearch("");
    setWantedSearch("");
  };
  return (
    <div className="home-main-container">
      <Header />
      <div className="links-and-videos-section-container">
        <div className="links-container">
          <p>home</p>
          <Link to="/trending">
            <p>Trending</p>
          </Link>
          <Link to="/gaming">
            <p>Gaming</p>
          </Link>
          <Link to="/saved-videos">
            <p>Saved Videos</p>
          </Link>
        </div>
        <div className="search-and-video-viewer-container">
          <div>{showBanner && <BannerSection closeBanner={closeBanner} />}</div>
          <div>
            <input
              type="search"
              value={usersSearch}
              onChange={onChangeUsersSearch}
            />
            <button onClick={onClickSearchVideosButton}>search</button>
          </div>
          <div>
            <VideosHome wantedSearch={wantedSearch} clickRetry={clickRetry} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
