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

searchMedicines:(data)=>{
  const token = localStorage.getItem("authToken");
  return api.get(`http://localhost:8043/medicine/search/keyword?query=${data}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
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

addToCart:(data)=>{
const token =localStorage.getItem("authToken");
return api.post(`http://localhost:8043/cart/addToCart`, data,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

getCartItems:()=>{
  const token =localStorage.getItem("authToken");
return api.get(`http://localhost:8043/cart/get/cartItems`,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

removeFromCart:(id)=>{
  const token = localStorage.getItem("authToken");
  return api.delete(`http://localhost:8043/cart/remove/cartItems/${id}`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

updateCartQuantity: (id, action) => {
  const token = localStorage.getItem("authToken");
  return api.put(`http://localhost:8043/cart/updateQuantity/${id}?action=${action}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
},

checkOut: () => {
  const token = localStorage.getItem("authToken");
  return api.put(
    `http://localhost:8043/cart/checkout`,
    {}, // empty body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},

getOrderSummary:()=>{
  const token =localStorage.getItem("authToken");
return api.get(`http://localhost:8043/cart/fetch/orderSummary`,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

}

export default AuthService;
