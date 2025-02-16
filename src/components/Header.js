import React , { useContext } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button ,Badge} from 'react-bootstrap';
import { FaShoppingCart, FaUserPlus, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CartContext } from "../context/CartContext";
export const Header = () => {
  const cartContext = useContext(CartContext); // ✅ Safe usage
  const cartItems = cartContext ? cartContext.cartItems : []; //


  return (
    <Navbar expand="lg" bg="black" variant="black" className="py-4">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" style={{color:"white"}}>Medicare</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{color:"white"}}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" style={{color:"white"}}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{color:"white"}}>Contact Us</Nav.Link>

          </Nav>

          {/* Search Box */}
          <Form className="d-flex mx-4">
            <FormControl
              type="text"
              placeholder="Search medicines..."
              className="me-2 rounded-pill px-3"
              style={{ width: '550px',height:"70px", border: '5px solidrgb(4, 14, 15)' }} // Stylish border
            />
            <Button variant="light" className="rounded-pill" style={{ width: '70px',height:"70px" }}>
              <FaSearch />
            </Button>
          </Form>

          {/* Cart Icon */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/cart" className="mx-3">
              <FaShoppingCart size={24} color="white" />
              Cart{" "}
              {cartItems.length > 0 && (
                <Badge pill bg="danger" className="ms-0">
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>

            {/* Signup Icon */}
            <Nav.Link as={Link} to="/signup" className="mx-2 d-flex align-items-center" style={{color:"white"}}>
              <FaUserPlus size={24} color="white" className="me-1" />
              Signup/Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
