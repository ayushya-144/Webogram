import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./webNavbar.css";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { Context } from "../Router.jsx";

export default function WebNavbar() {
  const contextValue = useContext(Context);
  return (
    <Navbar expand="lg" className="bg-body-tertiary border-bottom">
      <Container className="d-flex justify-content-around">
        <Navbar.Brand>
          <NavLink className="brand-logo text-decoration-none" to="/home">
            Webogram
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
            />
          </Form>
          <Nav className="me-1">
            <NavLink
              className="fa fa-home text-decoration-none text-center mx-2 d-flex mt-2 h-50"
              to="/home"
            ></NavLink>
            <Nav.Link className="text-decoration-none text-center mx-2">
              <i onClick={contextValue} className="fa fa-plus"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
