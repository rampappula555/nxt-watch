import "./index.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErroMessage, setShowErrorMessage] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onChangeUsername = (event) => setUsername(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeCheckbox = (event) => setCheckedStatus(event.target.checked);
  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch("https://apis.ccbp.in/login", options);
    const fetchedData = await response.json();
    if (response.ok) {
      Cookies.set("jwtToken", fetchedData.jwt_token, { expires: 30 });
      navigate("/", { replace: true });
    } else if (response.ok === false) {
      setErrorMessage(fetchedData.error_msg);
      setShowErrorMessage(true);
    }
  };
  const jwtToken = Cookies.get("jwtToken");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <div className="loginform-main-container">
      <div className="logo-and-form-container">
        <div className="border-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
              className="nxtwatch-logo"
            />
          </div>
          <div>
            <form onSubmit={onSubmitLoginForm}>
              <label htmlFor="username">USERNAME</label>
              <br />
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={onChangeUsername}
                value={username}
              />
              <br />
              <div className="password-label">
                <label htmlFor="password">PASSWORD</label>
                <br />
                <input
                  id="password"
                  type={checkedStatus ? "text" : "password"}
                  placeholder="Password"
                  onChange={onChangePassword}
                  value={password}
                />
              </div>
              <input
                type="checkbox"
                id="show-password"
                onChange={onChangeCheckbox}
              />
              <label htmlFor="show-password">Show Password</label>
              <br />
              <div className="login-button-container">
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
              {showErroMessage && (
                <p className="error-message">*{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
