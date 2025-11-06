import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.css"; // ✅ Scoped CSS Module

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
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
      await AuthService.signup(requestData);
      toast.success("🎉 Signup successful! Redirecting to login...", {
        position: "bottom-center",
        autoClose: 5000,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("❌ Signup failed. Please try again.", {
        position: "bottom-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <Card className={styles.signupCard}>
        <ToastContainer />
        <Row>
          {/* Left Stylish Section */}
          <Col md={6} className={styles.imageContainer}>
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeIcon}>💊</div>
              <h2 className={styles.welcomeTitle}>Welcome to Medicare</h2>
              <p className={styles.welcomeSubtitle}>
                Your trusted healthcare partner — order medicines, consult doctors, 
                and stay healthy with ease.
              </p>
            </div>
          </Col>

          {/* Right Side: Signup Form */}
          <Col md={6} className={styles.formContainer}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {step === 1 && (
              <div>
                <h3 className={styles.title}>Sign In / Sign Up</h3>
                <p className={styles.subtitle}>
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
                      className={styles.inputField}
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
                      className={styles.inputField}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className={styles.btnCustom}
                    disabled={loading}
                  >
                    {loading ? "Sending OTP..." : "Submit"}
                  </Button>
                </Form>

                {/* ✅ Redirect to Login */}
                <div className={styles.redirectLogin}>
                  <p style={{ textAlign: "center", marginTop: "15px", color: "#6c757d" }}>
                    Already signed up ?{" "}
                    <span
                      style={{ color: "#009970", cursor: "pointer", fontWeight: "600" }}
                      onClick={() => navigate("/login")}
                    >
                      Login 
                    </span>
                  </p>
                </div>

                <div className={styles.socialLogin}>
                  
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
