import { useState, useEffect } from "react";
const NoInternet = (props) => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    setIsOnline(navigator.onLine);
  }, []);
  window.addEventListener("online", () => setIsOnline(true));
  window.addEventListener("offline", () => setIsOnline(false));
  if (isOnline) {
    return props.children;
  }
  return <h1>NO INTERNET</h1>;
};
export default NoInternet;
