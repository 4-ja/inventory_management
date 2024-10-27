import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import AddItem from './AddItem';
import './Inventory.css';
import EditItem from './EditItem';

const InventoryTable = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false); 
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

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

  const toggleAddDrawer = () => {
    setIsAddDrawerOpen(!isAddDrawerOpen);
  };

  const handleItemAdded = () => {
    fetchItems(); // Refresh the item list after adding a new item
    setIsAddDrawerOpen(false); // Close the add drawer
  };

  // Open edit drawer with item data for editing
  const handleEditClick = (item) => {
    setEditItem(item);
    setIsEditDrawerOpen(true);
  };

  const handleItemUpdated = () => {
    fetchItems(); // Refresh items after updating
    setEditItem(null); // Clear edit item state
    setIsEditDrawerOpen(false); // Close the edit drawer
  };

  // Delete an item with confirmation
  const handleDeleteItem = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/Inventory/${id}`);
        setItems(items.filter(item => item._id !== id)); // Remove deleted item from the list
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
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
        <button className="add-button" onClick={toggleAddDrawer}>Add Item</button>
      </div>

      {/* Edit Item Drawer */}
      <EditItem
        isDrawerOpen={isEditDrawerOpen}
        toggleDrawer={() => setIsEditDrawerOpen(false)}
        itemToEdit={editItem}
        onItemUpdated={handleItemUpdated}
      />
      
      {/* Add Item Drawer */}
      <AddItem 
        isDrawerOpen={isAddDrawerOpen} 
        toggleDrawer={toggleAddDrawer} 
        onItemAdded={handleItemAdded}
      />

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
            <th>Actions</th>
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
    </div>
  );
};

export default InventoryTable;
