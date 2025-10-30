import api from "./api";

const AuthService = {
  signup: (data) => api.post("/auth/signup", data),
  sendOtp: (data) => api.post("/generate", data),
  validateOtp: (data) => api.post("/validate/otp", data),
  login: (data) => api.post("/login", data)
};

export default AuthService;
