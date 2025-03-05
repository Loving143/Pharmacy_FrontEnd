import React, { useState } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import medicare from "../assets/Medicare.png"; // Ensure this path is correct
import "../Signup.css"; // Import external CSS file
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = function (e) {
    e.preventDefault();
    AuthService.sendOtp(email)
        .then(function () {
            setStep(2); // Move to OTP verification step
        })
        .catch(function (error) {
            setError("Failed to send OTP. Please try again.");
            console.error("OTP Error:", error);
        });
};

  const handleVerifyOtp = function (e) {
    e.preventDefault();
    AuthService.verifyOtp(email, otp)
        .then(function (response) {
            const { token, role } = response.data;

            AuthService.setAuthToken(token);
            AuthService.setUserRole(role);
        
            // Store token and role in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userRole", role);
            window.dispatchEvent(new Event("storage"));

            // Redirect based on role
            if (role === "ADMIN") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        })
        .catch(function (error) {
            setError("Invalid OTP. Please try again.");
            console.error("OTP Verification Error:", error);
        });
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
           

            {step === 1 && (
              <div>
               <h3 className="title">Sign In / Sign Up</h3>
               <p className="subtitle">
                 Sign up or Sign in to access your orders, special offers, health tips, and more!
               </p>
              <Form onSubmit={handleSendOtp}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="btn-custom">
                  Get OTP
                </Button>
              </Form>
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
              </div>
            )}

{step === 2 && (
  <OtpVerification/>)}

            {error && <p className="text-danger">{error}</p>}


            {/* <Form onSubmit={handleLogin}>
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
            </Form> */}

            {/* Social Logins */}
           
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Signup;
