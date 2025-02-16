import React from "react";
import { Card, Button } from "react-bootstrap";
import "../ProductCard.css"; // Import external CSS file
import { Link } from "react-router-dom";
const ItemCard = ({ item }) => {
  return (
    <Card className="product-card">
      <Card.Img variant="top" src={item.image} alt={item.name} className="product-image"/>
      <Card.Body>
        

        <Card.Title>{item.name}</Card.Title>
            <Card.Text>Price: ₹{item.price}</Card.Text>
                <Button variant="dark" as={Link} to={`/product/${item.id}`}>
                  View Details
                </Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
