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
  console.log(token+" I am getting the token ");
return api.get(`http://localhost:8043/cart/fetch/orderSummary`,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

fetchAddresses:()=>{
  const token = localStorage.getItem("authToken");
  return api.get(`http://localhost:8043/address/list`,
{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},
saveAddress:(data)=>{
  const token = localStorage.getItem("authToken");
  return api.post(`http://localhost:8043/address/add`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

makeDefaultAddress: (id) => {
  const token = localStorage.getItem("authToken");
  return api.put(`http://localhost:8043/address/makeDefault/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

deleteAddress:(id)=>{
const token = localStorage.getItem("authToken");
  return api.delete(`http://localhost:8043/address/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

editAddress:(id,data)=>{
const token = localStorage.getItem("authToken");
  return api.put(`http://localhost:8043/address/update/${id}`, data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

setAddressId: (id) => {
  const token = localStorage.getItem("authToken");
  return api.put(
    `/cart/setAddressId/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
},


/** ----------------- Medicine APIs ----------------- **/

  // Fetch all categories
  getCategories: () => {
    return api.get(`/medicine/user/categories`)
  },

  // Fetch all subcategories
  getSubcategories: () => {
    return api.get(`/medicine/user/subCategories`)
    },

  // Fetch all medicines
  getMedicines: () => {
    const token = localStorage.getItem("authToken");
    return api.get(`/api/medicines`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Fetch medicines by subcategory
  getMedicinesBySubcategory: (subCatCode) => {
    console.log(subCatCode+" This is code")
    return api.get(`/medicine/user/fetchMedicine/${subCatCode}`)
  },

  // Search medicines by keyword (already exists, just for reference)
  searchMedicines: (keyword) => {
    const token = localStorage.getItem("authToken");
    return api.get(`/medicine/search/keyword?query=${encodeURIComponent(keyword)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /** ----------------- Category / Subcategory by ID (Optional) ----------------- **/

  // Fetch category by ID
  getCategoryById: (id) => {
    const token = localStorage.getItem("authToken");
    return api.get(`/api/categories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Fetch subcategory by ID
  getSubcategoryById: (id) => {
    const token = localStorage.getItem("authToken");
    return api.get(`/api/subcategories/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};




export default AuthService;
