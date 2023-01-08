import "./App.css";
import SavedVideosContext from "./context/SavedVideosContext";
import VideoItemDetailsRoute from "./components/VideoItemDetailsRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Gaming from "./components/Gaming";
import Trending from "./components/Trending";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import SavedVideos from "./components/SavedVideos";
import NotFound from "./components/NotFound";

import { useState, useEffect } from "react";

function App() {
  const savedVideos = JSON.parse(sessionStorage.getItem("savedVideos"));
  const [savedVideosList, setSavedVideosList] = useState(
    savedVideos === null ? [] : savedVideos
  );
  const [updatedArray, setUpdatedArray] = useState([]);
  const addToSavedVideos = (newVideo) =>
    setSavedVideosList((prevState) => [...prevState, newVideo]);

  useEffect(() => {
    sessionStorage.setItem("savedVideos", JSON.stringify(savedVideosList));
  }, [savedVideosList]);

  useEffect(() => {
    const seen = new Set();
    const filteredArr = savedVideosList.filter((el) => {
      const duplicate = seen.has(el.id);
      seen.add(el.id);
      return !duplicate;
    });
    setUpdatedArray(filteredArr);
  }, [savedVideosList]);
  return (
    <BrowserRouter>
      <SavedVideosContext.Provider
        value={{ savedVideosList, addToSavedVideos, updatedArray }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/saved-videos" element={<SavedVideos />} />
            <Route path="/video/:id" element={<VideoItemDetailsRoute />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Route>
        </Routes>
      </SavedVideosContext.Provider>
    </BrowserRouter>
  );
}

export default App;
