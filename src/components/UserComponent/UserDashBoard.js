import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical, LogOut, User, ShoppingCart } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import authService from "../../Services/AuthService";// Import Cart Context
import { CartContext } from "../../context/CartContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUserDetails());
  const { addToCart } = useContext(CartContext);

  // Add product to cart if stored in localStorage
  useEffect(() => {
    const pendingProduct = localStorage.getItem("pendingProduct");
    if (pendingProduct) {
      addToCart(JSON.parse(pendingProduct)); // Add product to cart
      localStorage.removeItem("pendingProduct"); // Clear after adding
    }
  }, [addToCart]);

  const handleLogout = () => {
    authService.removeAuthToken();
    navigate("/login"); // Redirect to Login
  };

  return (
    <div>Hello welcome user!</div>

      
  );
};

export default UserDashboard;
