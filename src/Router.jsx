import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LogIn from "./features/log-in/LogIn.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./features/sign-up/SignUp.jsx";
import Home from "./features/homepage/Home.jsx";
import WebNavbar from "./components/WebNavbar.jsx";
import ShowNavbar from "./components/ShowNavbar.jsx";
import ErrorPage from "./pages/error-page/ErrorPage";
import { useState, createContext } from "react";
import ModalPopUp from "./components/ModalPopUp.jsx";

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
            <Route path="/" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
}
