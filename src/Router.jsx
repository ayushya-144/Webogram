import { store } from "./app/store.js";
import { Provider } from "react-redux";
import LogIn from "./features/log-in/LogIn.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./features/sign-up/SignUp.jsx";
import Home from "./features/homepage/Home.jsx";

export default function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
