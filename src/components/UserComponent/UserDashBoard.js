import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  FaFilePrescription,
  FaUserMd,
  FaShoppingCart,
  FaSyncAlt,
  FaBoxOpen,
  FaUserPlus,
  FaSearch,
} from "react-icons/fa";
import UserLayout from "./UserLayout";
import styles from "./Userdashboard.module.css";
import MedicineSearch from "./MedicineSearch"; // ✅ import new component

const UserDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userEmail = decoded.sub || decoded.email;
      setEmail(userEmail);

      axios
        .get(
          `http://localhost:8043/api/user-profiles/profile/${encodeURIComponent(
            userEmail
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => setUserProfile(res.data || null))
        .catch(() => setUserProfile(null))
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") setShowResults(true);
  };

  const handleBackToDashboard = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  if (loading) return <div className={styles.loading}>Loading dashboard...</div>;

  return (
    <UserLayout
      email={email}
      userProfile={userProfile}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      permissions={{ canAccessWallet: true, canAccessOrders: true }}
    >
      <div className={styles.header}>
        <div className={styles.welcomeText}>
          <h3>Welcome, {userProfile?.firstName || "User"} 👋</h3>
          <p>{email}</p>
        </div>
      </div>

      {/* 🔍 Search Box */}
      <div className={styles.searchWrapper}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchBoxAligned}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for medicines, doctors, or health services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInputAligned}
            />
            <button type="submit" className={styles.searchButtonAligned}>
              Search
            </button>
          </div>
        </form>
      </div>

      {/* 🩺 Main Content */}
      {!userProfile ? (
        <div className={styles.noProfile}>
          <FaUserPlus size={60} color="#007bff" />
          <h3>No Profile Found</h3>
          <p>Let's set up your profile to get started.</p>
          <button
            className={styles.createProfileButton}
            onClick={() => navigate("/create-profile", { state: { email } })}
          >
            Create Profile
          </button>
        </div>
      ) : !showResults ? (
        // Default Dashboard
        <div className={styles.cards}>
          <div className={`${styles.card} ${styles.cardBlue}`}>
            <FaFilePrescription size={40} />
            <h2>Upload Prescription</h2>
          </div>

          <div className={`${styles.card} ${styles.cardTeal}`}>
            <FaUserMd size={40} />
            <h2>Consult a Doctor</h2>
          </div>

          <div className={`${styles.card} ${styles.cardYellow}`}>
            <FaShoppingCart size={40} />
            <h2>View Cart</h2>
          </div>

          <div className={`${styles.card} ${styles.cardRed}`}>
            <FaSyncAlt size={40} />
            <h2>Reorder Medicine</h2>
          </div>

          <div className={`${styles.card} ${styles.cardPurple}`}>
            <FaBoxOpen size={40} />
            <h2>My Orders</h2>
          </div>
        </div>
      ) : (
        // ✅ Medicine Search Results Component
        <MedicineSearch query={searchQuery} onBack={handleBackToDashboard} />
      )}
    </UserLayout>
  );
};

export default UserDashboard;
