// AddressPage.jsx
import React, { useState, useEffect } from "react";
import styles from "./AddrrssPage.module.css";
import AuthService from "../Services/AuthService";

import { useNavigate } from "react-router-dom";
const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    pincode: "",
    house: "",
    area: "",
    city: "",
    state: "",
    landmark: "",
  });

  // ------------------------------------
  // LOAD USER ADDRESSES
  // ------------------------------------
  const fetchAddresses = async () => {
    try {
      const res = await AuthService.fetchAddresses();
      setAddresses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch addresses", err);
      setAddresses([]);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ------------------------------------
  // FORM HANDLERS
  // ------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ⭐ SAVE or UPDATE ADDRESS
  const handleSubmit = async () => {
    try {
      if (editingAddressId) {
        // 🔥 UPDATE EXISTING ADDRESS
        await AuthService.editAddress(editingAddressId, formData);
      } else {
        // 🔥 ADD NEW ADDRESS
        await AuthService.saveAddress(formData);
      }

      await fetchAddresses();

      // Reset
      setShowForm(false);
      setEditingAddressId(null);
      setFormData({
        name: "",
        mobile: "",
        pincode: "",
        house: "",
        area: "",
        city: "",
        state: "",
        landmark: "",
      });

    } catch (err) {
      console.error("Failed to save/update address", err);
    }
  };

  // 🔥 Set selected address as Default
  const handleMakeDefault = async (addressId) => {
    try {
      await AuthService.makeDefaultAddress(addressId);
      fetchAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Delete address
  const handleDeleteAddress = async (addressId) => {
    try {
      await AuthService.deleteAddress(addressId);
      fetchAddresses();
    } catch {
      console.log("error");
    }
  };

  // ⭐ EDIT BUTTON → Load address into form
  const startEditing = (addr) => {
    setEditingAddressId(addr.id);
    setFormData({
      name: addr.name,
      mobile: addr.mobile,
      pincode: addr.pincode,
      house: addr.house,
      area: addr.area,
      city: addr.city,
      state: addr.state,
      landmark: addr.landmark,
    });

    setShowForm(true);
  };

  const deliverHere = async(id)=>{
    try{
    await AuthService.setAddressId(id);
      navigate("/order-summary"); 
    }catch{
      console.log("Error aaye to saud ko pelo ..")
    }
  }

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Addresses</h2>

      <button
        className={styles.addBtn}
        onClick={() => {
          setEditingAddressId(null);
          setFormData({
            name: "",
            mobile: "",
            pincode: "",
            house: "",
            area: "",
            city: "",
            state: "",
            landmark: "",
          });
          setShowForm(true);
        }}
      >
        + Add New Address
      </button>

      {/* ADD / EDIT ADDRESS FORM */}
      {showForm && (
        <div className={styles.formWrapper}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>
              {editingAddressId ? "Edit Address" : "Add New Address"}
            </h3>

            <div className={styles.formGrid}>
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
              <input name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} />
              <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
              <input name="house" placeholder="House No." value={formData.house} onChange={handleChange} />
              <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} />
              <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
            </div>

            <div className={styles.formActions}>
              <button className={styles.saveBtn} onClick={handleSubmit}>
                {editingAddressId ? "Update" : "Save"}
              </button>

              <button className={styles.cancelBtn} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADDRESS LIST */}
      {addresses.length === 0 && !showForm && (
        <p className={styles.noData}>No addresses found</p>
      )}

      {addresses.length > 0 && !showForm && (
        <div className={styles.cardsContainer}>
          {addresses.map((addr, i) => (
            <div
              key={i}
              className={`${styles.addressCard} ${addr.isDefault ? styles.defaultCard : ""}`}
            >
              <div className={styles.cardHeader}>
                <h1><b>{addr.name}</b></h1>
                {addr.isDefault && (
                  <span className={styles.defaultBadge}>Default</span>
                )}
              </div>

              <div className={styles.addressDetails}>
                <p><strong>Mobile :</strong> {addr.mobile}</p>
                <p><strong>Pincode :</strong> {addr.pincode}</p>
                <p><strong>City :</strong> {addr.city}</p>
                <p><strong>State :</strong> {addr.state}</p>
                <p><strong>Address :</strong> {addr.addressLine1}</p>
              </div>

              <div className={styles.actions}>
                
                {addr.isDefault ? (
                  <button className={styles.deliverBtn} onClick = {()=>deliverHere(addr.id)}>Deliver Here</button>
                ) : (
                  <button
                    className={styles.defaultBtn}
                    onClick={() => handleMakeDefault(addr.id)}
                  >
                    Set as Default
                  </button>
                )}

                <button
                  className={styles.editBtn}
                  onClick={() => startEditing(addr)}
                >
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => handleDeleteAddress(addr.id)}
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressPage;
