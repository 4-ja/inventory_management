import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = ({ isDrawerOpen, toggleDrawer }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    amount: '',
    manufacturer: '',
    pricephp: '',
    serialnumber: '',
    supplier: ''
  });
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/Inventory', formData);
      setShowSuccess(true); // Show success message
      setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
      toggleDrawer(); // Close the drawer on successful add
      window.location.reload(); // Refresh to show the added item
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  return (
    <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
      {showSuccess && (
        <div className="success-message">Item added successfully!</div>
      )}
      <form>
        <h2>Add New Item</h2>
        
        <label>Item Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Amount in Store</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label>Manufacturer</label>
        <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />

        <label>Price (PHP)</label>
        <input type="number" name="pricephp" value={formData.pricephp} onChange={handleChange} required />

        <label>Serial Number</label>
        <input type="text" name="serialnumber" value={formData.serialnumber} onChange={handleChange} required />

        <label>Supplier</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />

        <button type="submit" onSubmit={handleAddItem}>Add</button>
        <button type="button" onClick={toggleDrawer}>Cancel</button>
      </form>
    </div>
  );
};

export default AddItem;
