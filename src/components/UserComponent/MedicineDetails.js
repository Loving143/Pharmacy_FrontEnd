import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus, FaArrowLeft, FaPills, FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios";
import styles from "./MedicineDetails.module.css";
import AuthService from "../../Services/AuthService"; // optional if using JWT auth

const MedicineDetails = () => {
  const { state: medicine } = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Handle click outside (to go back)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        navigate(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  if (!medicine) {
    return <div className={styles.notFound}>No medicine data found.</div>;
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 0 ? quantity - 1 : 0);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      const payload = {
        medicineCode: medicine.medicineCode,
        quantity: quantity,
      };
      const token = localStorage.getItem("authToken");
      if(token==null){
        navigate("/login")
      }
      await AuthService.addToCart(payload);

      // Automatically go back to medicine search list after success
      navigate(-1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = medicine.price * quantity;

  return (
    <div className={styles.overlay}>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.icon}>
          <FaPills />
        </div>

        <h2 className={styles.title}>{medicine.name}</h2>
        <p className={styles.desc}>{medicine.desc}</p>

        <p className={styles.priceLabel}>Price per unit:</p>
        <p className={styles.price}>₹{medicine.price}</p>

        <div className={styles.quantityControl}>
          <button onClick={handleDecrease} className={styles.qtyBtn}>
            <FaMinus />
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button onClick={handleIncrease} className={styles.qtyBtn}>
            <FaPlus />
          </button>
        </div>

        <div className={styles.totalPrice}>
          Total: <span>₹{totalPrice}</span>
        </div>

        <button
          className={styles.addToCart}
          onClick={handleAddToCart}
          disabled={loading || quantity === 0}
        >
          <FaCartPlus /> {loading ? "Adding..." : "Add to Cart"}
        </button>

        <button className={styles.back} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MedicineDetails;
