import "index.css";
const LoginForm = () => {
  return (
    <div>
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="nxtwatch-logo"
          />
        </div>
        <div>
          <form>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input id="username" type="text" />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input id="password" type="password" />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
