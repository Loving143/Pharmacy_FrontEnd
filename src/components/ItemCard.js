import React from "react";
import { Card, Button } from "react-bootstrap";
import "../ProductCard.css"; // Import external CSS file
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const handleClick = () => {
    // Store selected item in localStorage before navigating
    localStorage.setItem("selectedMedicine", JSON.stringify(item));
  };

  return (
    <Card className="product-card">
      <Card.Img
        variant="top"
        src={`data:image/jpeg;base64,${item.medicineImage}`}
        alt={item.medicineName}
        className="product-image"
      />
      <Card.Body>
        <Card.Title>{item.medicineName}</Card.Title>
        <Card.Text>Price: ₹{item.price}</Card.Text>
        <Button
          variant="dark"
          as={Link}
          to="/product/${item.id}"
          state={{ item }} // Correct way to pass state in React Router v6
          onClick={handleClick} // Save item in localStorage
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
