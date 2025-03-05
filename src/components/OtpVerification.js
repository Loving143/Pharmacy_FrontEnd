import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OtpInput.css';
import AuthService from "../Services/AuthService";

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Array of 6 OTP digits
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Handle input change and focus change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.match(/[0-9]/) || value === '') {
      // Update the OTP array
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on next input if the current input is filled
      if (index < otp.length - 1 && value) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle backspace to move focus backwards
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Function to verify OTP
  const verifyOtp = (e) => {
    e.preventDefault();
    const otpCode = otp.join(''); // Combine the OTP digits
    AuthService.verifyOtp(otpCode) // Call verify-otp function from AuthService
      .then(response => {
        console.log(response.data)
        const { token, user } = response.data;
        console.log(user)
        localStorage.setItem("user",user) ;
        localStorage.setItem("authToken",token);
        console.log(localStorage.getItem("authToken"));
        console.log("User is this.");

        if (user.role?.includes('CUSTOMER')) {
          navigate("/userDashBoard");
        }

      
      })
      .catch(error => {
        setError("Invalid OTP. Please try again.");
        console.error("OTP Verification Error:", error);
      });
  };

  return (
    <div className="otp-container">
      <h2>Enter the OTP</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="otp-box-container">
        <div className="otp-input-container">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={value}
              maxLength="1"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
              style={{ width: '60px', height: '60px', fontSize: '24px', textAlign: 'center', borderRadius: '10px', border: '2px solid #000' }}
            />
          ))}
        </div>
      </div>
      <button className="verify-button" onClick={verifyOtp} style={{ backgroundColor: 'black', color: 'white', padding: '12px 25px', border: 'none', cursor: 'pointer', fontSize: '18px', borderRadius: '5px' }}>Verify OTP</button>
    </div>
  );
};

export default OtpVerification;
