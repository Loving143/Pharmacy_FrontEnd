import React from "react";
import styles from "./MedicineDetails.module.css";

const MedicineDetailsPage = ({ medicine }) => {
  return (
    <div className={styles.container}>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span>Home</span> › <span>Medicines</span> ›{" "}
        <span className={styles.active}>View Details</span>
      </div>

      {/* Main Card */}
      <div className={styles.detailsCard}>
        
        {/* Left (Image Section) */}
        <div className={styles.leftSection}>
          <div className={styles.medicineImage}></div>
        </div>

        {/* Right (Details Section) */}
        <div className={styles.rightSection}>
          <h2 className={styles.medicineName}>{medicine.medicineName}</h2>

          <p className={styles.manufacturer}>
            Manufacturer: <strong>{medicine.manufacturer}</strong>
          </p>

          <hr />

          <p className={styles.price}>
            ₹{medicine.price}{" "}
            <span className={styles.discountTag}>{medicine.discount}% OFF</span>
          </p>

          <p className={styles.info}>
            <strong>Composition:</strong> {medicine.composition}
          </p>

          <p className={styles.info}>
            <strong>Dosage:</strong> {medicine.dosage}
          </p>

          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetailsPage;
