import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import med1 from "../assets/med1.jpg";

const products = [
  { id: 1, name: "Paracetamol", price: 50, image: med1, description: "Pain reliever and fever reducer" },
  { id: 2, name: "Cough Syrup", price: 120, image: med1, description: "Relieves cough and throat irritation" },
  { id: 3, name: "Vitamin C", price: 80, image: med1, description: "Boosts immunity and skin health" },
];

const ProductList = () => {
  return (
    <Container>
      <h2 className="text-center my-4">Select a Product</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="shadow">
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: ₹{product.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/product/${product.id}`}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
