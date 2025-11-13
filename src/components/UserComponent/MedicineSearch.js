import React, { useState } from "react";
import { FaPills, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./MedicineSearch.module.css"; // create a small css module
import axios from "axios";

import AuthService from "../../Services/AuthService";

const MedicineSearch = ({ query, onBack }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!query) return;

    const fetchMedicines = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await AuthService.searchMedicines(query);
       const list = Array.isArray(res)
      ? res
      : Array.isArray(res?.data)
      ? res.data
      : res
      ? [res]
      : [];
    setMedicines(list);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to fetch medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [query]);

  if (loading) return <div className={styles.loading}>Searching medicines...</div>;

  if (error)
    return (
      <div className={styles.errorContainer}>
  <div className={styles.errorBox}>
    <h2>⚠️ Failed to fetch medicines</h2>
    <p>Please try again later.</p>
    <button className={styles.backButton} onClick={onBack}>
      ← Back to Dashboard
    </button>
  </div>
</div>

    );

  return (
    <div className={styles.resultsContainer}>
      {medicines.length === 0 ? (
        <p className={styles.noResults}>No medicines found for “{query}”.</p>
      ) : (
        
        <div className={styles.medicineResults}>
         {
          medicines.map((med, index) => (
            <div key={index} className={styles.medicineCard}>
              <FaPills className={styles.pillIcon} />
              <h3>{med.name}</h3>
              <p>{med.description}</p>
              <span className={styles.price}>
                ₹{med.price != null ? med.price : "N/A"}
              </span>
              <button
                className={styles.viewButton}
                onClick={() => navigate(`/medicine/${med.id}`, { state: med })}
              >
                <FaEye className={styles.eyeIcon} /> View
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.backButtonContainer}>
        <button className={styles.backButton} onClick={onBack}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MedicineSearch;
