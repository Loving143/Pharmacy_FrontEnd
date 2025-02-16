import React, { useContext ,useState,useEffect } from "react";
import { useParams,useNavigate,useLocation } from "react-router-dom";
import { Card, Button, Container, ListGroup ,Badge,Modal} from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import MedicineService from "../Services/MedicineService";

const ProductDetails = () => {
  const location = useLocation();
  const item = location.state?.item || JSON.parse(localStorage.getItem("selectedMedicine")) || {};
  const [product, setMedicine] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { cart, addToCart, updateCartQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext); // Get user authentication status

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    if (item?.medicineCode && item?.batchNo) {
        MedicineService.fetchMedicineByMedicineCodeAndBatchNo(item.medicineCode, item.batchNo)
            .then(response => {
                if (response?.data) {
                  
                    setMedicine(response.data);
                    setError(""); // Clear previous errors
                } else {
                    setError("No medicine data found.");
                    setMedicine(null);
                }
            })
            .catch(error => {
                setError("Medicine not found or error fetching data.");
                console.error("Error:", error);
                setMedicine(null);
            });
    } else {
        setError("Invalid Medicine Code or Batch No.");
        setMedicine(null);
    }
}, [JSON.stringify(item)]);

  if (!product) {
    return (
      <Container className="my-4 text-center">
        <p className="text-danger">⚠️ Product not found!</p>
      </Container>
    );
  }
    const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = () => {
    if (!user) {
      console.log("User not logged in. Storing product in localStorage...");
    localStorage.setItem("pendingProduct", JSON.stringify(product)); 
    console.log("Stored Product:", JSON.parse(localStorage.getItem("pendingProduct")));
      navigate("/signup", { state: { from: `/product/${id}`, productToAdd: product } });
    } else {
      addToCart(product);
    }
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card className="shadow rounded p-4">
            <Row className="align-items-center">
              <Col md={5} className="text-center">
                <Card.Img variant="top" src={`data:image/jpeg;base64,${product.data.medicineImage}`} className="img-fluid rounded" />
              </Col>

              <Col md={7}>
                <Card.Body>
                  <Card.Title>{product.data.medicineName}</Card.Title>
                 
                  <div className="d-flex align-items-center">
                    {product.discount > 0 ? (
                      <>
                        <h4 className="text-success me-2">₹{discountedPrice.toFixed(2)}</h4>
                        <h5 className="text-muted text-decoration-line-through">
                          ₹{product.data.price}
                        </h5>
                        <Badge bg="danger" className="ms-2">
                          {product.discount}% OFF
                        </Badge>
                      </>
                    ) : (
                      <h4 className="text-success">₹{product.data.price}</h4>
                    )}
                  </div>

                    <Button variant="success" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
