import React, { useContext ,useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Card, Button, Container, ListGroup ,Badge,Modal} from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { Row, Col } from "react-bootstrap";
import med1 from "../assets/med1.jpg";
import med2 from "../assets/med1.jpg";
import med3 from "../assets/med1.jpg";
import med4 from "../assets/med1.jpg";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


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

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user authentication status

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const product = products.find((p) => p.id === parseInt(id));
   


  if (!product) {
    return (
      <Container className="my-4 text-center">
        <p className="text-danger">⚠️ Product not found!</p>
      </Container>
    );
  }

  // const cartItem = cart.find((item) => item.id === product.id);
  // const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (!user) {
      setShowLoginPrompt(true);
    } else {
      addToCart(product);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/signup", { state: { from: `/product/${id}`, productToAdd: product } });
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow rounded p-4">
            <Row className="align-items-center">
              <Col md={5} className="text-center">
                <Card.Img variant="top" src={product.image} className="img-fluid rounded" />
              </Col>

              <Col md={7}>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <h4>₹{product.price}</h4>

                    <Button variant="success" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Login Prompt Modal */}
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login to add products to your cart.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginPrompt(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleLoginRedirect}>Login</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductDetails;
