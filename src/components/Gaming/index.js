import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const apiStatusConst = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Gaming = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConst.initial);
  const [gamingVideosList, setGamingVideosList] = useState([]);
  useEffect(() => {
    const getVideos = async () => {
      setApiStatus(apiStatusConst.progress);
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        "https://apis.ccbp.in/videos/gaming",
        options
      );
      const fetchedData = await response.json();
      console.log(response);
      console.log(fetchedData);
      if (response.ok) {
        const data = fetchedData.videos.map((eachVideo) => ({
          id: eachVideo.id,
          thumbnailUrl: eachVideo.thumbnail_url,
          title: eachVideo.title,
          viewCount: eachVideo.view_count,
        }));
        setGamingVideosList(data);
        setApiStatus(apiStatusConst.success);
      } else if (response.ok === false) {
        setApiStatus(setApiStatus.failure);
      }
    };

    getVideos();
  }, []);

  const getProgressView = () => <h1>LOADING</h1>;
  const getSuccessView = () => {
    return (
      <div>
        <h1>Gaming</h1>
        {gamingVideosList.map((eachVideo) => {
          const { id, thumbnailUrl, title, viewCount } = eachVideo;
          return (
            <div key={id}>
              <img
                src={thumbnailUrl}
                alt="img"
                className="gaming-thumbail-image"
              />
              <p>{title}</p>
              <p>{viewCount}</p>
            </div>
          );
        })}
      </div>
    );
  };
  const getFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
          alt="failure view"
        />
      </div>
    );
  };
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
export default Gaming;
