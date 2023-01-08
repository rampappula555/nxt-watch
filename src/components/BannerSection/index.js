import "./index.css";
import { useState, useEffect } from "react";
const BannerSection = (props) => {
  const { closeBanner } = props;
  const [showBanner, setShowBanner] = useState(true);
  const onClickX = () => {
    setShowBanner(false);
  };
  useEffect(() => closeBanner(showBanner), [closeBanner, showBanner]);
  return (
    <div className="banner-section-main-container">
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="banner-section-nxtwatch-logo"
          />
        </div>
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button>GET IT NOW</button>
      </div>
      <div className="x-button-container">
        <button className="x-button" onClick={onClickX}>
          X
        </button>
      </div>
    </div>
  );
};
export default BannerSection;
