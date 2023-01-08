import Cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
const Header = () => {
  const logoutRef = useRef(null);
  const navigate = useNavigate();
  const onClickLogout = () => {
    setShowPopup(true);
  };
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const handler = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const onClickYes = () => {
    Cookies.remove("jwtToken");
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    const body = document.querySelector("body");
    if (showPopup) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "initial";
    }
  }, [showPopup]);
  return (
    <div className="header-main-container">
      <div className="header-container">
        <div className="header-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="header-logo"
          />
        </div>
        <div className="profile-and-button-container">
          <div className="profile-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-image"
            />
          </div>
          <div>
            <button onClick={onClickLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
        {showPopup && (
          <div className="logout-popup-container">
            <div className="logout-popup" ref={logoutRef}>
              <p>are you sure to want to exit</p>
              <button autoFocus onClick={onClickYes}>
                yes
              </button>
              <button>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
