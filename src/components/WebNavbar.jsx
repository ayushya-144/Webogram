import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./webNavbar.css";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { Context } from "../Router.jsx";
import { expireUserToken } from "../utils/getSessionData.js";
import AlertPopUp from "./AlertPopUp/AlertPopUp.jsx";
// import { useSearchPostsQuery } from "../features/homepage/home.js";

export default function WebNavbar() {
  const contextValue = useContext(Context);
  const [show, setShow] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleUserLogOut = () => {
    expireUserToken();
    navigate("/", { replace: true });
  };
  // const deferredSearchText = useDeferredValue(searchQuery);
  const handleSearchText = () => {
    // setSearchQuery(e.target.value);
  };
  // const { data, isLoading } = useSearchPostsQuery(deferredSearchText);
  // console.log(data);
  return (
    <>
      <AlertPopUp
        show={show}
        handleClose={handleClose}
        closeBtnTxt={"Close"}
        showConfirmBtn={true}
        handleConfirmMethod={handleUserLogOut}
      >
        Are you sure you want to Log Out?
      </AlertPopUp>
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
        <Container className="d-flex justify-content-around">
          <Navbar.Brand>
            <NavLink className="text-decoration-none" to="/home">
              <h4 className="brand-logo">Webogram</h4>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => handleSearchText(e)}
              />
            </Form>
            <Nav className="me-1">
              <NavLink
                className="fa fa-home text-decoration-none text-center mx-2 d-flex mt-2 h-50"
                to="/home"
              ></NavLink>
              <Nav.Link className="text-decoration-none text-center">
                <i onClick={contextValue} className="fa fa-plus"></i>
              </Nav.Link>
              <Nav.Link className="text-decoration-none text-center">
                <i onClick={handleShow} className="fa fa-power-off"></i>
              </Nav.Link>
              <NavLink
                className="fa fa-user text-decoration-none text-center mx-2 d-flex mt-2 h-50"
                to="/profile"
              ></NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
