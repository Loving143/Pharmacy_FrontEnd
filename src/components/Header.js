import React, { useContext, useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUserPlus, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Header = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext ? cartContext.cartItems : [];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      console.log(token);
      setIsAuthenticated(!!token);
    };

    // Check authentication status on component mount
    checkAuthStatus();

    // Listen for changes in localStorage
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="black" variant="black" className="py-4">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" style={{ color: "white" }}>Medicare</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: "white" }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: "white" }}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ color: "white" }}>Contact Us</Nav.Link>
          </Nav>

          {/* Search Box */}
          <Form className="d-flex mx-4">
            <FormControl
              type="text"
              placeholder="Search medicines..."
              className="me-2 rounded-pill px-3"
              style={{ width: "550px", height: "70px", border: "5px solid rgb(4, 14, 15)" }}
            />
            <Button variant="light" className="rounded-pill" style={{ width: "70px", height: "70px" }}>
              <FaSearch />
            </Button>
          </Form>

          {/* Cart Icon */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/cart" className="mx-3">
              <FaShoppingCart size={24} color="white" /> Cart {" "}
              {cartItems.length > 0 && (
                <Badge pill bg="danger" className="ms-0">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          {/* Authentication Links */}
          <Nav>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout} className="mx-2 d-flex align-items-center" style={{ color: "white", cursor: "pointer" }}>
                <FaSignOutAlt size={24} className="me-1" /> Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/signup" className="mx-2 d-flex align-items-center" style={{ color: "white" }}>
                <FaUserPlus size={24} className="me-1" /> Signup/Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
