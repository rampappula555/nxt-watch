import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import VideoViewer from "../VideoViewer";
const apiStatusConst = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Trending = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConst.initial);
  const [trendingVideosList, setTrendingVideosList] = useState([]);
  useEffect(() => {
    const getTrendingVideos = async () => {
      setApiStatus(apiStatusConst.progress);
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        methos: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        "https://apis.ccbp.in/videos/trending",
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
        setTrendingVideosList(data);
        setApiStatus(apiStatusConst.success);
      } else if (response.ok === false) {
        setApiStatus(apiStatusConst.failure);
      }
    };
    getTrendingVideos();
  }, []);

  const getProgressView = () => <h1>LOADING</h1>;
  const getSuccessView = () => {
    return (
      <div>
        <h1>Trending</h1>
        {trendingVideosList.map((eachVideo) => (
          <VideoViewer eachVideo={eachVideo} key={eachVideo.id} />
        ))}
      </div>
    );
  };
  const getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        className="failure-view-image"
        alt="img"
      />
    </div>
  );
  switch (apiStatus) {
    case apiStatusConst.progress:
      return getProgressView();
    case apiStatusConst.success:
      return getSuccessView();
    case apiStatusConst.failure:
      return getFailureView();
    default:
      return null;
  }
};
export default Trending;
