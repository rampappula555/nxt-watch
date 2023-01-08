import "./index.css";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import SavedVideosContext from "../../context/SavedVideosContext";
const apiStatusConst = {
  initial: "INITIAL",
  progress: "PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};
const VideoItemDetailsRoute = () => {
  const { id } = useParams();
  const value = useContext(SavedVideosContext);
  const { addToSavedVideos } = value;

  const [apiStatus, setApiStatus] = useState(apiStatusConst.initial);
  const [videoDetails, setVideoDetails] = useState({});
  // const[isSaved,setIsSaved]=useState(false)
  // const[isLiked,setIsLiked]=useState(false)
  // const[isUnliked,setIsUnliked]=useState(false)

  useEffect(() => {
    const getAllVideos = async () => {
      setApiStatus(apiStatusConst.progress);
      const jwtToken = Cookies.get("jwtToken");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await fetch(
        `https://apis.ccbp.in/videos/${id}`,
        options
      );
      const respData = await response.json();
      if (response.ok) {
        const videoDetailsData = {
          name: respData.video_details.channel.name,
          profileImageUrl: respData.video_details.channel.profile_image_url,
          subscriberCount: respData.video_details.channel.subscriber_count,
          id: respData.video_details.id,
          description: respData.video_details.description,
          publishedAt: respData.video_details.published_at,
          thumbnailUrl: respData.video_details.thumbnail_url,
          title: respData.video_details.title,
          videoUrl: respData.video_details.video_url,
          viewCount: respData.video_details.view_count,
          isLiked: false,
          isUnliked: false,
          isSaved: false,
        };
        setVideoDetails(videoDetailsData);
        setApiStatus(apiStatusConst.success);
      } else if (response.ok === false) {
        setApiStatus(apiStatusConst.failure);
      }
    };
    getAllVideos();
  }, [id]);
  const getProgressView = () => <h1>LOADING</h1>;
  const getSuccessView = () => {
    const {
      viewCount,
      description,
      name,
      subscriberCount,
      videoUrl,
      isLiked,
      isSaved,
      isUnliked,
    } = videoDetails;
    const onClickSave = () => {
      const SavedVideos = { ...videoDetails, isSaved: true };
      setVideoDetails(SavedVideos);
      if (isSaved === false) {
        addToSavedVideos(videoDetails);
      }
    };
    const onClickLike = () => {
      const likedVideos = { ...videoDetails, isLiked: true, isUnliked: false };
      setVideoDetails(likedVideos);
    };
    const onClickUnlike = () => {
      const unlikedVideos = {
        ...videoDetails,
        isUnliked: true,
        isLiked: false,
      };
      setVideoDetails(unlikedVideos);
    };
    const likeClsNm = isLiked ? "active" : null;
    const unlikeClsNm = isUnliked ? "unActive" : null;
    return (
      <div>
        <p>{viewCount}</p>
        <p>{description}</p>
        <p>{name}</p>
        <p>{subscriberCount}</p>
        <video src={videoUrl} controls />
        <button className={`${likeClsNm}`} onClick={onClickLike}>
          like
        </button>
        <button className={`${unlikeClsNm}`} onClick={onClickUnlike}>
          unlike
        </button>
        <button onClick={onClickSave}>{isSaved ? "saved" : "save"}</button>
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
export default VideoItemDetailsRoute;
