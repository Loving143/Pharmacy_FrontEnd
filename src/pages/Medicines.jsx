import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Medicines.module.css";
import AuthService from "../Services/AuthService";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedFilters, setSelectedFilters] = useState({
    availability: [],
    manufacturer: []
  });
  
  const navigate = useNavigate();
  const { subcategoryCode } = useParams();

  useEffect(() => {
    loadMedicines();
  }, [subcategoryCode]);

  useEffect(() => {
    filterAndSortMedicines();
  }, [medicines, searchTerm, sortBy, selectedFilters]);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const medicinesRes = await AuthService.getMedicinesBySubcategory(subcategoryCode);
      setMedicines(medicinesRes.data || []);
    } catch (error) {
      console.error("Error loading medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMedicines = () => {
    let filtered = medicines.filter(medicine => {
      const matchesSearch = medicine.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           medicine.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAvailability = selectedFilters.availability.length === 0 ||
                                selectedFilters.availability.includes(medicine.availability);
      
      const matchesManufacturer = selectedFilters.manufacturer.length === 0 ||
                                selectedFilters.manufacturer.includes(medicine.manufacturer);

      return matchesSearch && matchesAvailability && matchesManufacturer;
    });

    // Sort medicines
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name?.localeCompare(b.name);
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    setFilteredMedicines(filtered);
  };

  const handleAddToCart = (medicine) => {
    // Add to cart logic here
    console.log("Added to cart:", medicine);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < Math.floor(rating) ? styles.filled : ''}`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading medicines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <span onClick={() => navigate("/")}>Home</span>
          <span> › </span>
          <span onClick={() => navigate(-1)}>Categories</span>
          <span> › </span>
          <span className={styles.current}>Medicines</span>
        </div>
        
        <h1 className={styles.pageTitle}>Medicines</h1>
        <p className={styles.pageSubtitle}>Find the right medicine for your needs</p>
      </div>

      {/* Search and Filter Section */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search medicines by name or manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.sortFilter}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Medicines Grid */}
      <div className={styles.medicinesGrid}>
        {filteredMedicines.map((medicine) => (
          <div key={medicine.id} className={styles.medicineCard}>
            {/* Medicine Image */}
            <div className={styles.imageContainer}>
              
            </div>

            {/* Medicine Details */}
            <div className={styles.medicineDetails}>
              <h3 className={styles.medicineName}>{medicine.name}</h3>
              

              {/* Price and Availability */}
              <div className={styles.priceAvailability}>
                <div className={styles.priceSection}>
                  <span className={styles.currentPrice}>₹{medicine.price}</span>
                  {medicine.originalPrice && (
                    <span className={styles.originalPrice}>₹{medicine.originalPrice}</span>
                  )}
                  {medicine.discount && (
                    <span className={styles.discount}>{medicine.discount}% OFF</span>
                  )}
                </div>

               
              </div>

              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                
                <button className={styles.viewDetailsBtn} 
                 onClick={() => navigate(`/medicine/${medicine.id}`, { state: medicine })}
                >
                  <i className="fas fa-info-circle"></i>
                  View Details
                 </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <button className={styles.wishlistBtn}>
                <i className="far fa-heart"></i>
              </button>
              <button className={styles.compareBtn}>
                <i className="fas fa-balance-scale"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMedicines.length === 0 && (
        <div className={styles.emptyState}>
          <i className="fas fa-pills"></i>
          <h3>No medicines found</h3>
          <p>Try adjusting your search or filters</p>
          <button 
            className={styles.clearFiltersBtn}
            onClick={() => {
              setSearchTerm("");
              setSelectedFilters({ availability: [], manufacturer: [] });
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Medicines;