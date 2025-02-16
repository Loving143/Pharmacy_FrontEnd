import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <Container className="mt-5">
      <h2 className="fw-bold">Order Summary</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <Card key={item.id} className="mb-3">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ₹{item.price}</Card.Text>
                </Col>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                <div className="quantity-controls">
                
  <button className="quantity-btn" onClick={() => removeFromCart(item.id)}>-</button>
  <span className="quantity">{item.quantity}</span>
  <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
</div>

                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Proceed to Checkout Button */}
      {cartItems.length > 0 && (
        <Button variant="primary" as={Link} to="/checkout">
          Proceed to Checkout
        </Button>
      )}
    </Container>
  );
};

export default CartPage;
