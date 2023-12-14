import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LogIn from "./pages/user-registration/login/LogIn.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/user-registration/sign-up/SignUp.jsx";
import Home from "./pages/home-page/Home";
import WebNavbar from "./components/WebNavbar.jsx";
import ShowNavbar from "./components/ShowNavbar.jsx";
import ErrorPage from "./pages/error-page/ErrorPage";
import { useState, createContext } from "react";
import ModalPopUp from "./pages/create-post-pop-up/ModalPopUp.jsx";
import { RequiredAuth, ValidateAuth } from "./context/RequiredAuth.jsx";
import Profile from "./pages/profile/profile.jsx";

export const Context = createContext();
export default function Router() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Provider store={store}>
      <Context.Provider value={handleShow}>
        <BrowserRouter>
          <ShowNavbar>
            <WebNavbar />
            <ModalPopUp show={show} handleClose={handleClose} />
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
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
}
