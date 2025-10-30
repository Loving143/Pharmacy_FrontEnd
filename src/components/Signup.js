import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import medicare from "../assets/Medicare.png";
import "../Signup.css";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Login";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1); // Step 1: Signup, Step 2: OTP Verification
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Step 1: Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const requestData = {
      userName: email,
      password: password,
    };

    try {
      const response = await AuthService.signup(requestData);
        toast.success("🎉 Signup successful! Redirecting to login...", {
    position: "bottom-center",
    autoClose: 5000,
  });
      // Wait for 2 seconds to show the toast, then navigate
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    } catch (error) {
      toast.error("❌ Signup failed. Please try again.", {
    position: "bottom-center",
     autoClose: 5000,
     });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step 2: OTP Verification Handler
  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    setError("");

    const verifyRequestData = {
      userName: email,
      otp: otp,
    };

    try {
      const response = await AuthService.verifyOtp(verifyRequestData);
      const { token, role } = response.data;

      // Save in AuthService / Local Storage
      AuthService.setAuthToken(token);
      AuthService.setUserRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      window.dispatchEvent(new Event("storage"));

      // Navigate by role
      if (role === "ADMIN") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
       
      <Card className="signup-card">
        <ToastContainer />
        <Row>
          {/* Left Side: Image */}
          <Col md={6} className="image-container">
            <img src={medicare} alt="Pharmacy" className="medicare-image" />
          </Col>

          {/* Right Side: Signup Form */}
          <Col md={6} className="form-container">
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
            {step === 1 && (
              <div>
                <h3 className="title">Sign In / Sign Up</h3>
                <p className="subtitle">
                  Sign up or Sign in to access your orders, special offers, health tips, and more!
                </p>


                <Form onSubmit={handleSignup}>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-field"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-custom"
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Submit"}
                  </Button>
                </Form>

                <div className="social-login">
                  <Row>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="social-btn google"
                      >
                        <FaGoogle className="me-2" /> Google
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="outline-secondary"
                        className="social-btn facebook"
                      >
                        <FaFacebook className="me-2" /> Facebook
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            )}

           
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Signup;
