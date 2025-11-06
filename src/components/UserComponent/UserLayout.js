import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxes,
  FaMoneyBillWave,
  FaPills,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./Userdashboard.module.css";

const UserLayout = ({
  children,
  email,
  userProfile,
  activeSection,
  onSectionChange,
  permissions,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleProfileClick = () => {
    if (!userProfile) {
      navigate("/create-profile", { state: { email } });
    } else {
      navigate("/view-profile", { state: { email } });
    }
    onSectionChange("profile");
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Medicare</h2>
        </div>
        <ul>
          <li
            className={activeSection === "dashboard" ? styles.active : ""}
            onClick={() => {
              onSectionChange("dashboard");
              navigate("/user-dashboard");
            }}
          >
            <FaBoxes /> Dashboard
          </li>

          <li
            className={activeSection === "profile" ? styles.active : ""}
            onClick={handleProfileClick}
          >
            <FaPills /> {userProfile ? "View Profile" : "Create Profile"}
          </li>

          {permissions?.canAccessWallet && (
            <li
              className={activeSection === "wallet" ? styles.active : ""}
              onClick={() => onSectionChange("wallet")}
            >
              <FaMoneyBillWave /> Wallet
            </li>
          )}

          {permissions?.canAccessOrders && (
            <li
              className={activeSection === "orders" ? styles.active : ""}
              onClick={() => onSectionChange("orders")}
            >
              <FaBoxes /> Orders
            </li>
          )}

          <li onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className={styles.mainContent}>{children}</div>
    </div>
  );
};

export default UserLayout;
