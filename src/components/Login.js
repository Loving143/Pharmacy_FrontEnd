import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
import styles from "./Signup.module.css"; // ✅ Reuse the same CSS
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Step 1: Login Handler
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const requestData = {
      userName: email,
      password: password,
    };

    try {
      const response = await AuthService.login(requestData);
      toast.success("🎉 Sign-in successful! Redirecting...", {
        position: "bottom-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/otp-verification", { state: { email } });
      }, 2000);
    } catch (error) {
      toast.error("❌ Login failed. Please try again.", {
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

      AuthService.setAuthToken(token);
      AuthService.setUserRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      window.dispatchEvent(new Event("storage"));

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
    <div className={styles.signupContainer}>
      <Card className={styles.signupCard}>
        <ToastContainer />
        <Row>
          {/* Left Modern Gradient Section */}
          <Col md={6} className={styles.imageContainer}>
            <div className={styles.welcomeContent}>
              <div className={styles.welcomeIcon}>🔐</div>
              <h2 className={styles.welcomeTitle}>Welcome Back!</h2>
              <p className={styles.welcomeSubtitle}>
                Securely sign in to manage your prescriptions, consult doctors, 
                and explore exclusive offers with ease.
              </p>
            </div>
          </Col>

          {/* Right Side: Login Form */}
          <Col md={6} className={styles.formContainer}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {step === 1 && (
              <div>
                <h3 className={styles.title}>Login to Medicare</h3>
                <p className={styles.subtitle}>
                  Access your health records, orders, and personalized suggestions.
                </p>

                <Form onSubmit={handleSignIn}>
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
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </Form>

                <div className={styles.socialLogin}>
                  <p style={{ textAlign: "center", marginTop: "15px", color: "#6c757d" }}>
                    Don’t have an account?{" "}
                    <span
                      style={{ color: "#009970", cursor: "pointer", fontWeight: "600" }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
