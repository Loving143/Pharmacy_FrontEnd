import React, { useEffect, useState } from "react";
import styles from "./cartPage.module.css";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import AuthService from "../Services/AuthService";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await AuthService.getCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const proceedToCheckOut = async()=>{
    try{
      await AuthService.checkOut();
      console.log("Cart CheckedOut")
      navigate("/address")
    }catch(error){
      console.error("Error removing item:", error);
    }
  }

  const handleRemove = async (id) => {
    try {
      await AuthService.removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (id, action) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity =
            action === "inc"
              ? item.quantity + 1
              : item.quantity > 1
              ? item.quantity - 1
              : 1;

          const newFinalPrice = newQuantity * (item.price - item.discount);
          return { ...item, quantity: newQuantity, finalPrice: newFinalPrice };
        }
        return item;
      });

      setCartItems(updatedItems);
      await AuthService.updateCartQuantity(id, action);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartContainer}>
        <h2 className={styles.title}>🛒 Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Your cart is empty.</p>
        ) : (
          <>
            <div className={styles.cartList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartCard}>
                  {/* Image Section */}
                  <div className={styles.imageContainer}>
                    <img
                      src={item.imageUrl}
                      alt={item.medicineName}
                      className={styles.productImage}
                    />
                  </div>

                  {/* Details Section */}
                  <div className={styles.detailsContainer}>
                    <h3 className={styles.productName}>{item.medicineName}</h3>
                    <p className={styles.supplier}>Sold by: {item.supplierName}</p>
                    <div className={styles.priceRow}>
                      <span className={styles.finalPrice}>₹{item.finalPrice.toFixed(2)}</span>
                      <span className={styles.originalPrice}>₹{item.price}</span>
                      <span className={styles.discount}>
                        ₹{item.discount} OFF
                      </span>
                    </div>

                    <div className={styles.quantityControl}>
                      <button
                        onClick={() => handleQuantityChange(item.id, "dec")}
                      >
                        <FaMinus />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, "inc")}
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totalSection}>
              <h3>
                Total Amount: <span>₹{totalAmount.toFixed(2)}</span>
              </h3>
              <button className={styles.checkoutBtn} onClick={()=>proceedToCheckOut()}>Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
