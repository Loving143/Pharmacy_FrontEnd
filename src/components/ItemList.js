import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ItemCard from "./ItemCard";
import med1 from "../assets/med1.jpg"; 
import med2 from "../assets/med2.jpg"; 
import med3 from "../assets/med3.jpg";  
import med4 from "../assets/med4.jpg";  

const products = [
  {
    id: 1,
    name: "Paracetamol",
    price: 50,
    discount:20,
    image: med1
  },
  {
    id: 2,
    name: "Cough Syrup",
    price: 120,
    discount:20,
    image: med2
  },
  {
    id: 3,
    name: "Vitamin Tablets",
    price: 300,
    discount:20,
    image: med3
  },
  {
    id: 4,
    name: "First Aid Kit",
    price: 500,
    discount:20,
    image: med4
  },
  {
    id: 5,
    name: "Paracetamol",
    price: 50,
    discount:20,
    image: med1
  },
  {
    id: 6,
    name: "Cough Syrup",
    price: 120,
    discount:20,
    image: med2
  },
  {
    id: 7,
    name: "Vitamin Tablets",
    price: 300,
    discount:20,
    image: med3
  },
  {
    id: 8,
    name: "First Aid Kit",
    price: 500,
    discount:20,
    image: med4
  }
];

const ItemList = () => {
  return (
    <Container className="my-4">
      <Row>
        {products.map((item) => (
          <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
            <ItemCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ItemList;
