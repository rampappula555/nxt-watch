import "./index.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import VideoViewer from "../VideoViewer";
const apiStatusConsts = {
  initial: "INITIAL",
  success: "SUCCESS",
  progress: "PROGRESS",
  failure: "FAILURE",
};
const VideosHome = (props) => {
  const { wantedSearch, clickRetry } = props;
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);
  const [homepageVideosList, setHomePageVideosList] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      setApiStatus(apiStatusConsts.progress);
      const jwtToken = Cookies.get("jwtToken");

      const options = {
        methos: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `https://apis.ccbp.in/videos/all?search=${wantedSearch}`,
        options
      );
      const fetchedData = await response.json();
      if (response.ok) {
        const data = fetchedData.videos.map((eachVideo) => ({
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
          id: eachVideo.id,
          publishedAt: eachVideo.published_at,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewCount: eachVideo.view_count,
        }));
        setHomePageVideosList(data);
        setApiStatus(apiStatusConsts.success);
      } else if (response.ok === false) {
        setApiStatus(apiStatusConsts.failure);
      }
    };
    getVideos();
  }, [wantedSearch]);
  const getProgressView = () => <h1>LOADING</h1>;
  const getSuccessView = () => {
    const onClickRetry = () => {
      clickRetry();
    };
    return (
      <div>
        {homepageVideosList.length > 0 ? (
          <div className="videos-grid-container">
            {homepageVideosList.map((eachVideo) => (
              <VideoViewer eachVideo={eachVideo} key={eachVideo.id} />
            ))}
          </div>
        ) : (
          <div className="no-videos-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no-results-img"
              className="no-search-results-image"
            />
            <button onClick={onClickRetry}>Retry</button>
          </div>
        )}
      </div>
    );
  };
  const getFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          className="homepage-failure-view-image"
          alt="failure view"
        />
      </div>
    );
  };
  switch (apiStatus) {
    case apiStatusConsts.progress:
      return getProgressView();
    case apiStatusConsts.success:
      return getSuccessView();
    case apiStatusConsts.failure:
      return getFailureView();
    default:
      return null;
  }
};
export default VideosHome;
