import React, { useState } from 'react';
import axios from 'axios';
import './AddItem.css';

const AddItem = ({ isDrawerOpen, toggleDrawer, onItemAdded }) => { 
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    AmountInStore: '',
    manufacturer: '',
    pricePHP: '',
    serialNumber: '',
    supplier: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/Inventory', formData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
   
      setFormData({
        itemName: '',
        category: '',
        AmountInStore: '',
        manufacturer: '',
        pricePHP: '',
        serialNumber: '',
        supplier: ''
      });
      
      toggleDrawer();
      onItemAdded(); 
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  return (
    <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
      {showSuccess && (
        <div className="success-message">Item added successfully!</div>
      )}
      <form onSubmit={handleAddItem}>
        <h2>Add New Item</h2>
        
        <label>Item Name</label>
        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />

        <label>Category</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />

        <label>Amount in Store</label>
        <input type="number" name="AmountInStore" value={formData.AmountInStore} onChange={handleChange} required />

        <label>Manufacturer</label>
        <input type="text" name="manufacturer" value={formData.manufacturer} onChange={handleChange} required />

        <label>Price (PHP)</label>
        <input type="number" name="pricePHP" value={formData.pricePHP} onChange={handleChange} required />

        <label>Serial Number</label>
        <input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />

        <label>Supplier</label>
        <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} required />

        <button type="submit">Add</button>
        <button type="button" onClick={toggleDrawer}>Cancel</button>
      </form>
    </div>
  );
};

export default AddItem;
