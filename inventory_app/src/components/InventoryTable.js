import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import AddItem from './AddItem';
import './Inventory.css';

const InventoryTable = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/Inventory');
      console.log("Fetched items:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await axios.get(`http://localhost:8000/api/Inventory?search=${event.target.value}`);
      setItems(response.data);
    } catch (error) {
      console.error("Error searching items", error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Add item to inventory
  const handleAddItem = async (itemData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/Inventory', itemData);
      setItems([...items, response.data]); // Append new item to the list
    } catch (error) {
      console.error("Error adding item", error);
    }
  };

  // Update an existing item
  const handleUpdateItem = async (updatedItem) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/Inventory/${updatedItem._id}`, updatedItem);
      setItems(items.map(item => item._id === updatedItem._id ? response.data : item));
      setEditItem(null); // Reset edit item
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/Inventory/${id}`);
      setItems(items.filter(item => item._id !== id)); // Remove deleted item from the list
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  // Open drawer with item data for editing
  const handleEditClick = (item) => {
    setEditItem(item);
    setIsDrawerOpen(true);
  };

    useEffect(() => {
      fetchItems();
    }, []);

  return (
    <div className="inventory-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="./inv_logo.svg" alt="Logo" className="logo-img" />
            <span className='title'>Inventory</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className="icon">
              <img className="icon" src='./dash_selected.svg' alt="Dashboard" />
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/items" className="active">
              <img className="icon" src='./items_unsel.svg' alt="Items" />
              <span className="nav-text">Items</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="header">
        <h2>All Items</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Item"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <button className="add-button" onClick={toggleDrawer}>Add Item</button>
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Amount In Store</th>
            <th>Manufacturer</th>
            <th>Price (PHP)</th>
            <th>Serial Number</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.itemName || "N/A"}</td>
              <td>{item.category || "N/A"}</td>
              <td>{item.amountInStore || "N/A"}</td>
              <td>{item.manufacturer || "N/A"}</td>
              <td>{item.pricePHP || "N/A"}</td>
              <td>{item.serialNumber || "N/A"}</td>
              <td>{item.supplier || "N/A"}</td>
              <td>
                <button onClick={() => handleEditClick(item)}>Edit</button>
                <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddItem isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default InventoryTable;
