import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SubcategoryPage.module.css";

const Subcategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subcategories = [], categoryName = "" } = location.state || {};

  const handleSubcategoryClick = (subId) => {
    navigate(`/medicines/${subId}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subcategories of {categoryName}</h2>

      <div className={styles.grid}>
        {subcategories.map((sub) => (
          <div
            key={sub.id}
            className={styles.card}
            onClick={() => handleSubcategoryClick(sub.subCategoryCode)}
          >
            <div className={styles.image}>
              <div className={styles.imagePlaceholder}>📦</div>
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{sub.name}</h3>
              <p className={styles.cardSubtitle}>
                {sub.description || "Explore medicines in this category"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
