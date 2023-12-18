import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./webNavbar.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { expireUserToken } from "../../utils/getSessionData.js";
import AlertPopUp from "../AlertPopUp/AlertPopUp.jsx";
import { successToaster } from "../../utils/toaster.jsx";
import ModalPopUp from "../../pages/create-post-pop-up/ModalPopUp.jsx";
import { useLocation } from "react-router-dom";

export default function WebNavbar() {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  useEffect(() => {
    if (location.pathname === "/profile") {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [location]);
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useSearchParams({
    search: "",
    isMyPostsOnly: false,
    isPrivate: false,
  });
  const search = searchQuery.get("search");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCreatePopUp, setShowCreatePopUp] = useState(false);

  const handleCloseCreatePopUp = () => setShowCreatePopUp(false);
  const handleShowCreatePopUp = () => setShowCreatePopUp(true);

  const navigate = useNavigate();
  const handleUserLogOut = () => {
    expireUserToken();
    navigate("/", { replace: true });
    successToaster("You have been Logged Out");
  };
  const handleSearchText = (e) => {
    setSearchQuery(
      (prev) => {
        prev.set("search", e.target.value);
        return prev;
      },
      {
        replace: true,
      }
    );
  };
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
      <ModalPopUp show={showCreatePopUp} handleClose={handleCloseCreatePopUp} />
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
        <Container className="d-flex justify-content-around">
          <Navbar.Brand>
            <NavLink className="text-decoration-none" to="/home">
              <h4 className="brand-logo">Webogram</h4>
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            {showSearch && (
              <>
                <Form className="d-flex mx-auto">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => handleSearchText(e)}
                    value={search}
                  />
                </Form>
                <div className="btn-group-toggle" data-toggle="buttons">
                  <label className="btn btn-secondary active">
                    <input
                      className="d-none"
                      type="checkbox"
                      autoComplete="off"
                      onClick={(e) => {
                        setSearchQuery(
                          (prev) => {
                            prev.set("isMyPostsOnly", e.target.checked);
                            return prev;
                          },
                          {
                            replace: true,
                          }
                        );
                      }}
                    />
                    My Posts
                  </label>
                </div>
              </>
            )}
            <Nav className="me-1">
              <NavLink
                className="fa fa-home text-decoration-none text-center mx-2 d-flex mt-2 h-50"
                to="/home"
              ></NavLink>
              <Nav.Link className="text-decoration-none text-center">
                <i onClick={handleShowCreatePopUp} className="fa fa-plus"></i>
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
