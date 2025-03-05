import axios from "axios";

const API_BASE_URL = "http://localhost:80/api/auth"; // Replace with your actual backend URL

const authService = {
  // 1️⃣ Send OTP to user email
  sendOtp: (email) => {
    return axios.post(`${API_BASE_URL}/customer/login`, { username: email });
  },

  // 2️⃣ Verify OTP and receive authentication token
  verifyOtp: (email, otp) => {
    return axios.post(`${API_BASE_URL}/customer/verify-otp`, { email, otp });
  },

  // 3️⃣ Store authentication token in localStorage   
  setAuthToken: (token) => {
    localStorage.setItem("authToken", token);
  },

  // 4️⃣ Retrieve authentication token from localStorage
  getAuthToken: () => {
    return localStorage.getItem("authToken");
  },

  // 5️⃣ Remove authentication token from localStorage (Logout)
  removeAuthToken: () => {
    localStorage.removeItem("authToken");
  },

  // // 6️⃣ Store user role in localStorage
  // setUserRole: (role) => {
  //   localStorage.setItem("userRole", role);
  // },

  getUserRole: () => {
    localStorage.getItem("role");
  },

  setUserDetails: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem("user")).userName); // Store user as a JSON string
    const userRole = user?.role || [];
    let role = null;
    if(userRole.includes("CUSTOMER")){
      role="CUSTOMER";
    }
    console.log(role+"hdh");
    localStorage.setItem("role",role);
  },

  getUserDetails: () => {
    return localStorage.getItem("user");
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log("This is the userDetails."+user);
    // if (userDetails) {
    //   return JSON.parse(userDetails);
    // }// Retrieve user details as JSON
    // return null;
  },

  // 7️⃣ Get user role from localStorage
  getRole: () => {
    return localStorage.getItem("role");
  }
};

export default authService;
