import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheet/app.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
