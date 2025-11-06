import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthService from "../Services/AuthService";
import "./OtpVerification.css";
import medicareLogo from "../assets/Medicare.png";
import { jwtDecode } from "jwt-decode";


const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Received from Login page

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP verification
  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    const payload = {
      userName: email,
      otp: otpValue,
    };

    try {
      setLoading(true);
      const response = await AuthService.validateOtp(payload);

      if (response.status === 200 && response.data) {
        const { token, username } = response.data;

        // ✅ Store token and username
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", username);

        // ✅ Decode JWT to check role
        const decoded = jwtDecode(token);
        const roles = decoded.authorities || [];

        if (roles.includes("ROLE_USER")) {
          navigate("/user-dashboard");
        } else {
          setError("Access denied. Only USER role can access this page.");
        }
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <img src={medicareLogo} alt="MediCare" className="pharmacy-logo" />
        <h1 className="pharmacy-title">MediCare Pharmacy</h1>
        <p className="pharmacy-subtitle">
          Secure verification for your MediCare account access
        </p>

        <h2 className="otp-title">Verify Your OTP</h2>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to your email ({email})
        </p>

        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-input"
            />
          ))}
        </div>

        {error && <p className="error">{error}</p>}

        <button className="verify-btn" onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="resend-text">
          Didn’t receive the code? <span className="resend-link">Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
