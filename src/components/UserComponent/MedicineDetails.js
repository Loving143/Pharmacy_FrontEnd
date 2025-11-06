import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus, FaArrowLeft, FaPills } from "react-icons/fa";
import styles from "./MedicineDetails.module.css";

const MedicineDetails = () => {
  const { state: medicine } = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        navigate(-1); // Go back to the previous page
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

  return (
    <div className={styles.overlay}>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.icon}>
          <FaPills />
        </div>
        <h2>{medicine.name}</h2>
        <p className={styles.desc}>{medicine.desc}</p>
        <p className={styles.price}>{medicine.price}</p>

        <button className={styles.addToCart}>
          <FaCartPlus /> Add to Cart
        </button>

        <button className={styles.back} onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MedicineDetails;
