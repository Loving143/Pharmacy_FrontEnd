import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if there is a pending product in localStorage
    if (user) {
        console.log("User gets loggined")
      const pendingProduct = JSON.parse(localStorage.getItem("pendingProduct"));
      console.log(pendingProduct)
      if (pendingProduct) {
        addToCart(pendingProduct);
        localStorage.removeItem("pendingProduct"); // Clear it after adding
      }
    }
  }, [user, addToCart]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication logic
    if (credentials.email === "user@example.com" && credentials.password === "password") {
      login({ email: credentials.email }); // Simulate user login
      navigate("/"); // Redirect to homepage
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={credentials.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
