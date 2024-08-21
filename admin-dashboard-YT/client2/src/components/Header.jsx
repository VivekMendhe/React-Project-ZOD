import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    // localStorage.clear()
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Admin-Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>

              {auth ? (
                <>
                  <NavLink to="/products" className="nav-link">
                    Products
                  </NavLink>
                  <NavLink to="/add-product" className="nav-link">
                    Add Products
                  </NavLink>
                  <NavLink to="/signin" className="nav-link" onClick={logout}>
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/signup" className="nav-link">
                    Signup
                  </NavLink>
                  <NavLink to="/signin" className="nav-link">
                    Signin
                  </NavLink>
                </>
              )}
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
