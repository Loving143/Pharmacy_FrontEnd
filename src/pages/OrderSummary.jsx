import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import styles from "./OrderSummary.module.css"; // ✅ Import CSS

const OrderSummary = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderSummary();
  }, []);

  const fetchOrderSummary = async () => {
    try {
      const res = await AuthService.getOrderSummary();
      setOrder(res.data);
    } catch (error) {
      console.error("Error fetching order summary:", error);
    }
  };

  const handlePayment = () => {
    navigate("/payment");
  };

  if (!order) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-xl">
        Loading your order summary...
      </div>
    );
  }

  return (
    <div className={styles.pageBackground}>
      <div className={styles.orderCard}>
        {/* Header */}
        <div className={styles.header}>
          <FaShoppingBag className={styles.headerIcon} />
          <h1 className={styles.headerTitle}>Order Summary</h1>
        </div>

        {/* User Info */}
        <div className={styles.userSection}>
          <p>
            <strong>User:</strong>{" "}
            <span className="text-teal-700 font-medium">
              {order.userEmail || "Customer"}
            </span>
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={styles.statusText}>Pending</span>
          </p>
        </div>

        {/* Summary */}
        <div className={styles.summaryBox}>
          <h2>Billing Details</h2>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{order.subTotalAmount?.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Tax</span>
            <span>₹{order.taxCharge?.toFixed(2)}</span>
          </div>

          <div className={styles.summaryRow}>
            <span>Delivery Charge</span>
            <span>₹{order.deliveryCharge}</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.discount}`}>
            <span>Discount</span>
            <span>- ₹{order.discountedAmount?.toFixed(2)}</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total Price</span>
            <span>₹{order.totalPrice?.toFixed(2)}</span>
          </div>

          <div className={`${styles.summaryRow} ${styles.finalAmount}`}>
            <span>Final Amount</span>
            <span>₹{order.finalAmount?.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Button */}
        <button onClick={handlePayment} className={styles.paymentButton}>
          <FaCheckCircle className="text-white text-xl" />
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
