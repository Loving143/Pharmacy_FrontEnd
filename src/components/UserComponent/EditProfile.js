// src/components/UserComponent/EditProfile.js
import React, { useState, useEffect } from "react";
import { Form, Button, Spinner, Card } from "react-bootstrap";
import {
  FaUserEdit,
  FaTint,
  FaCalendarAlt,
  FaPhoneAlt,
  FaHeartbeat,
} from "react-icons/fa";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./EditProfile.module.css";
import UserLayout from "./UserLayout";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    age: "",
    bloodGroup: "",
    healthCondition: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // ✅ Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AuthService.getProfile(email);
        setProfile(res.data);
      } catch (err) {
        console.warn("⚠️ No existing profile found:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [email]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.updateProfile(email, profile);
      toast.success("Profile updated successfully!");
      navigate("/view-profile", { state: { email } });
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      toast.error("Failed to update profile!");
    }
  };

  // ✅ Optional handler for sidebar navigation
  const handleSectionChange = (section) => {
    if (section === "dashboard") navigate("/user-dashboard", { state: { email } });
    else if (section === "profile") navigate("/view-profile", { state: { email } });
    else if (section === "orders") navigate("/my-orders", { state: { email } });
  };

  if (loading) {
    return (
      <UserLayout
        activeSection="editProfile"
        email={email}
        onSectionChange={handleSectionChange}
      >
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading profile...</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout
      activeSection="editProfile"
      email={email}
      onSectionChange={handleSectionChange}
    >
      <div className={styles.editProfileContainer}>
        <Card className="shadow-sm p-4">
          <h3 className={styles.heading}>
            <FaUserEdit /> Edit Your Profile
          </h3>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>
                  <FaCalendarAlt /> Date of Birth
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>
                  <FaPhoneAlt /> Phone Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={profile.phoneNumber || ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="col-md-4 mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={profile.age || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="col-md-4 mb-3">
                <Form.Label>
                  <FaTint /> Blood Group
                </Form.Label>
                <Form.Select
                  name="bloodGroup"
                  value={profile.bloodGroup || ""}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
              </div>

              <div className="col-md-4 mb-3">
                <Form.Label>
                  <FaHeartbeat /> Health Condition
                </Form.Label>
                <Form.Control
                  type="text"
                  name="healthCondition"
                  value={profile.healthCondition || ""}
                  onChange={handleChange}
                  placeholder="e.g. Diabetic, Healthy"
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <Button type="submit" variant="success" className="me-3">
                Save Changes
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/view-profile", { state: { email } })}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </UserLayout>
  );
};

export default EditProfile;
