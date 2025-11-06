import React, { useEffect, useState } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import {
  FaUserEdit,
  FaPhoneAlt,
  FaTint,
  FaCalendarAlt,
  FaEnvelope,
  FaHeartbeat,
} from "react-icons/fa";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ViewProfile.module.css";
import UserLayout from "./UserLayout"; // ✅ Reusable layout

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("viewProfile"); // ✅ track section
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // ✅ Handle sidebar navigation
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "dashboard") navigate("/user-dashboard", { state: { email } });
    else if (section === "orders") navigate("/my-orders", { state: { email } });
    else if (section === "profile") navigate("/view-profile", { state: { email } });
  };

  // ✅ Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AuthService.getProfile(email);
        setProfile(res.data);
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
        toast.error("Failed to load profile!");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  // ✅ Show loader while fetching
  if (loading) {
    return (
      <UserLayout
        activeSection={activeSection}
        email={email}
        profile={profile}
        onSectionChange={handleSectionChange} // ✅ passes safely
      >
        <div className={`${styles.viewProfileContainer} text-center mt-5`}>
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading profile...</p>
        </div>
      </UserLayout>
    );
  }

  // ✅ No profile found
  if (!profile) {
    return (
      <UserLayout
        activeSection={activeSection}
        email={email}
        profile={profile}
        onSectionChange={handleSectionChange}
      >
        <div className={`${styles.viewProfileContainer} text-center mt-5`}>
          <h3>No profile found.</h3>
          <Button
            variant="primary"
            onClick={() =>
              navigate("/create-profile", { state: { email } })
            }
          >
            Create Profile
          </Button>
        </div>
      </UserLayout>
    );
  }

  // ✅ Render profile details
  return (
    <UserLayout
      activeSection={activeSection}
      email={email}
      profile={profile}
      onSectionChange={handleSectionChange}
    >
      <div className={styles.viewProfileContainer}>
        <div className={styles.profileHeader}>
          <img
            src={profile.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className={styles.profileAvatar}
          />
          <div className={styles.headerText}>
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
            <p>
              <FaEnvelope className={styles.iconSmall} /> {profile.email}
            </p>
            <span className={styles.tagline}>
              Your health, your care, your profile.
            </span>
          </div>
        </div>

        <Card className={`${styles.profileCard} shadow-sm`}>
          <Card.Body>
            <h4 className={styles.sectionHeading}>👤 Personal Information</h4>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <FaCalendarAlt className={styles.icon} />
                <span>
                  <strong>DOB:</strong> {profile.dateOfBirth || "Not available"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <FaPhoneAlt className={styles.icon} />
                <span>
                  <strong>Phone:</strong> {profile.phoneNumber || "Not available"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <FaUserEdit className={styles.icon} />
                <span>
                  <strong>Age:</strong> {profile.age || "Not available"}
                </span>
              </div>
            </div>

            <h4 className={`${styles.sectionHeading} mt-4`}>
              🩺 Health Details
            </h4>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <FaTint className={styles.icon} />
                <span>
                  <strong>Blood Group:</strong> {profile.bloodGroup || "Not available"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <FaHeartbeat className={styles.icon} />
                <span>
                  <strong>Health Condition:</strong>{" "}
                  {profile.healthCondition || "Healthy"}
                </span>
              </div>
            </div>

            <div className={styles.profileActions}>
              <Button
                variant="outline-success"
                className={styles.editBtn}
                onClick={() =>
                  navigate("/edit-profile", { state: { email } })
                }
              >
                Edit Profile
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </UserLayout>
  );
};

export default ViewProfile;
