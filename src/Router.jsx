import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LogIn from "./pages/user-registration/login/LogIn.jsx";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/user-registration/sign-up/SignUp.jsx";
import Home from "./pages/home-page/Home";
import WebNavbar from "./components/navbar/WebNavbar.jsx";
import ShowNavbar from "./components/navbar/ShowNavbar.jsx";
import ErrorPage from "./pages/error-page/ErrorPage";
import { RequiredAuth, ValidateAuth } from "./context/RequiredAuth.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { Toaster } from "react-hot-toast";
import { createContext } from "react";
import Activity from "./pages/profile/activity/Activity.jsx";
import Conversation from "./pages/profile/activity/conversation/Conversation.jsx";

export const SearchContext = createContext(null);
export default function Router() {
  return (
    <Provider store={store}>
      <Toaster />
      <ShowNavbar>
        <WebNavbar />
      </ShowNavbar>
      <Routes>
        <Route
          path="/"
          element={
            <ValidateAuth>
              <LogIn />
            </ValidateAuth>
          }
        />
        <Route
          path="/sign-up"
          element={
            <ValidateAuth>
              <SignUp />
            </ValidateAuth>
          }
        />
        <Route
          path="/home"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />
        <Route
          path="/activity"
          element={
            <RequiredAuth>
              <Activity />
            </RequiredAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <RequiredAuth>
              <Conversation />
            </RequiredAuth>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}
