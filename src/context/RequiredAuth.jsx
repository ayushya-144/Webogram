import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserToken } from "./../utils/getSessionData";

export const RequiredAuth = ({ children }) => {
  const navigate = useNavigate();
  const loggedInUser = getUserToken();
  useEffect(() => {
    if (loggedInUser === undefined || loggedInUser === null) {
      return navigate("/");
    }
  });
  return <>{children}</>;
};

export const ValidateAuth = ({ children }) => {
  const navigate = useNavigate();
  const loggedInUser = getUserToken();
  useEffect(() => {
    if (loggedInUser !== undefined && loggedInUser !== null) {
      navigate("/home");
    }
  }, [loggedInUser, navigate]);
  return <>{children}</>;
};
