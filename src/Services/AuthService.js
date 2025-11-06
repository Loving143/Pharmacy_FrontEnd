import api from "./api";

const AuthService = {
  signup: (data) => api.post("/auth/signup", data),
  sendOtp: (data) => api.post("/generate", data),
  validateOtp: (data) => api.post("/auth/verify-otp", data),
  login: (data) => api.post("/auth/login", data),
  createProfile : (data) => {
    const token = localStorage.getItem("authToken");
    return api.post("/api/user-profiles/create",data,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })},
  
  getProfile: (email) => {
  const token = localStorage.getItem("authToken");
  return api.get(`/api/user-profiles/profile/${encodeURIComponent(email)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

updateProfile(email, data) {
  const token = localStorage.getItem("authToken");
  return api.put(`http://localhost:8043/api/user-profiles/update/${encodeURIComponent(email)}`, data,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},
};

export default AuthService;
