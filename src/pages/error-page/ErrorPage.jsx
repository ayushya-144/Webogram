import { expireUserToken } from "../../utils/getSessionData";
import "./error.css";
import { NavLink } from "react-router-dom";
export default function ErrorPage({ children }) {
  if (children) {
    expireUserToken();
    return (
      <div className="error-page">
        <div className="error-txt">
          <img className="error-img" src="error.png" />
          <h1>{children}</h1>
          <NavLink to="/">Login</NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className="error-page">
        <div className="error-txt">
          <img className="error-img" src="error.png" />
          <h1>The page you are looking for does not exists!</h1>
        </div>
      </div>
    );
  }
}
