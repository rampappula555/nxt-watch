import React from "react";
const SavedVideosContext = React.createContext({
  savedVideosList: [],
  updatedArray: [],
  addToSavedVideos: () => {},
});
export default SavedVideosContext;
