import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import medicare from "../assets/Medicare.png"; // Ensure this path is correct
import "../Signup.css"; // Import external CSS file

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`OTP sent to: ${phoneNumber}`);
  };

  return (
    <div className="signup-container">
      <Card className="signup-card">
        <Row>
          {/* Left Side: Image */}
          <Col md={6} className="image-container">
            <img src={medicare} alt="Pharmacy" className="medicare-image" />
          </Col>

          {/* Right Side: Login Form */}
          <Col md={6} className="form-container">
            <h3 className="title">Sign In / Sign Up</h3>
            <p className="subtitle">
              Sign up or Sign in to access your orders, special offers, health tips, and more!
            </p>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="input-field"
                  />
                </div>
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-custom">
                USE OTP
              </Button>
            </Form>

            {/* Social Logins */}
            <div className="social-login">
              <Row>
                <Col>
                  <Button variant="outline-secondary" className="social-btn google">
                    <FaGoogle className="me-2" /> Google
                  </Button>
                </Col>
                <Col>
                  <Button variant="outline-secondary" className="social-btn facebook">
                    <FaFacebook className="me-2" /> Facebook
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Signup;
