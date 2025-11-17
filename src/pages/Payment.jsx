import React, { useEffect, useState } from "react";
import styles from "./Payment.module.css";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Order from Backend
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // const res = await api.get("/cart/summary", {
        //   headers: { Authorization: `Bearer ${token}` }
        // });

        // setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  // Load Razorpay Script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Payment Handler
  const handlePayment = async () => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const { razorpayOrderId, amount, key } =null;

      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "Online Medical Store",
        description: "Order Payment",
        order_id: razorpayOrderId,

        prefill: {
          name: order?.userName,
          email: order?.email,
          contact: order?.mobile
        },

        handler: async function (response) {
          // Verify payment in backend
        //   await api.post("/payment/verify", response);

          alert("Payment Successful!");
          window.location.href = "/payment-success";
        },

        theme: {
          color: "#057a55", // green
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  if (loading) return <h3>Loading Payment Page...</h3>;

  return (
    <div className={styles.paymentContainer}>
      <h1 className={styles.heading}>Secure Payment</h1>

      <div className={styles.card}>
        <h2>Order Summary</h2>
        <p><strong>Final Amount:</strong> ₹45</p>
        <p><strong>Delivery To:</strong> Tannu</p>
        <p><strong>Mobile:</strong> 999647784</p>
      </div>

      <button className={styles.payBtn} onClick={handlePayment}>
        Pay ₹ 45 with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;
