import React, { useContext, useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Badge,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaUserPlus,
  FaSearch,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export const Header = () => {
  const cartContext = useContext(CartContext);
  const cartItems = cartContext ? cartContext.cartItems : [];
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const name = localStorage.getItem("userName") || "User";
      setUserName(name);
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#009879" }}
      variant="dark"
      className="py-4"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: "white", fontSize: "1.8rem", fontWeight: "bold" }}
        >
          Medicare
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ color: "white" }}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" style={{ color: "white" }}>
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ color: "white" }}>
              Contact Us
            </Nav.Link>
          </Nav>

          {/* Search Box */}
          <Form className="d-flex mx-4">
            <FormControl
              type="text"
              placeholder="Search medicines..."
              className="me-2 rounded-pill px-3"
              style={{
                width: "550px",
                height: "50px",
                border: "none",
                outline: "none",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            />
            <Button
              variant="light"
              className="rounded-pill"
              style={{
                width: "50px",
                height: "50px",
                border: "none",
              }}
            >
              <FaSearch />
            </Button>
          </Form>

          {/* Cart Icon */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/cart" className="mx-3">
              <FaShoppingCart size={22} color="white" /> Cart{" "}
              {cartItems.length > 0 && (
                <Badge pill bg="danger" className="ms-0">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          {/* Authentication Section */}
          <Nav className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                {/* User Icon and Name */}
                <div className="d-flex align-items-center mx-3 text-white">
                  <FaUserCircle size={28} className="me-2" />
                  <span style={{ fontWeight: "500" }}>{userName}</span>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline-light"
                  className="rounded-pill"
                  onClick={handleLogout}
                  style={{
                    padding: "6px 18px",
                    fontWeight: "500",
                    border: "1px solid white",
                  }}
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="mx-2 d-flex align-items-center"
                  style={{ color: "white", fontWeight: "500" }}
                >
                  <FaUserPlus size={20} className="me-1" /> Signup/Login
                </Nav.Link>

                {/* Subtle text link (optional, for login page) */}
                <div
                  style={{
                    color: "white",
                    fontSize: "0.9rem",
                    marginLeft: "10px",
                    opacity: "0.9",
                  }}
                >
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    style={{
                      color: "#d2f5ea",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
