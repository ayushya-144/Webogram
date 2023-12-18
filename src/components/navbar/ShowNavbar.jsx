import { useLocation } from "react-router-dom";

function ShowNavbar({ children }) {
  const location = useLocation();
  if (location.pathname !== "/" && location.pathname !== "/sign-up") {
    return <div>{children}</div>;
  }
}

export default ShowNavbar;
