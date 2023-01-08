import "./index.css";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
// Return the distance between the given date and now in words.
const VideoViewer = (props) => {
  const { eachVideo } = props;
  const { thumbnailUrl, title, name, profileImageUrl, publishedAt, id } =
    eachVideo;
  return (
    <div className="video-thumbnail-container">
      <Link to={`/video/${id}`}>
        <img
          src={thumbnailUrl}
          alt="img"
          className="homepage-video-thumbnail"
        />
        <p className="title">{title}</p>
        <p>{name}</p>
        <img
          src={profileImageUrl}
          alt="img"
          className="channel-profile-image"
        />

        <p>{formatDistanceToNow(new Date(publishedAt))} ago</p>
      </Link>
    </div>
  );
};
export default VideoViewer;
