import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditItem.css';

const EditItem = ({ isDrawerOpen, toggleDrawer, itemToEdit, onItemUpdated }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    AmountInStore: '',
    manufacturer: '',
    pricePHP: '',
    serialNumber: '',
    supplier: ''
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        itemName: itemToEdit.itemName || '',
        category: itemToEdit.category || '',
        AmountInStore: itemToEdit.AmountInStore || '',
        manufacturer: itemToEdit.manufacturer || '',
        pricePHP: itemToEdit.pricePHP || '',
        serialNumber: itemToEdit.serialNumber || '',
        supplier: itemToEdit.supplier || ''
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/Inventory/${itemToEdit._id}`, formData);
      toggleDrawer();
      onItemUpdated(); 
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  return (
<div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>

      <form onSubmit={handleUpdateItem}>
        <h2>Edit Item</h2>

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

        <button type="submit">Update</button>
        <button type="button" onClick={toggleDrawer}>Cancel</button>
      </form>
    </div>
  );
};

export default EditItem;
