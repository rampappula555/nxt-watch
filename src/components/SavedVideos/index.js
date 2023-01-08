import "./index.css";
import SavedVideosContext from "../../context/SavedVideosContext";
import { useContext } from "react";
const SavedVideos = () => {
  const value = useContext(SavedVideosContext);
  const { updatedArray } = value;
  return (
    <div>
      {updatedArray.map((eachVideo) => {
        const { title, thumbnailUrl, id } = eachVideo;

        return (
          <div key={id}>
            <p>{title}</p>
            <img src={thumbnailUrl} alt="img" />
          </div>
        );
      })}
    </div>
  );
};
export default SavedVideos;
