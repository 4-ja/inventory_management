// ...other imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import AddItem from './AddItem';
import './Inventory.css';
import EditItem from './EditItem';
import Search from './Search';
import './Search.css';

const InventoryTable = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false); 
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

   // Function to handle logout
   const handleLogout = () => {
    // Add logout logic here, like clearing tokens
    console.log("Logging out");
    navigate('/login'); // Redirect to login page
  };

  // Fetch items function
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/Inventory');
      console.log("Fetched items:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = items.filter(item => 
        item.itemName.toLowerCase().includes(query.toLowerCase()) ||
        item._id.includes(query)
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  // Toggle add item drawer
  const toggleAddDrawer = () => {
    if (isEditDrawerOpen) {
      setIsEditDrawerOpen(false); // Close the edit drawer if it's open
    }
    setIsAddDrawerOpen(!isAddDrawerOpen); // Toggle the add drawer
  };

  // Handle item added
  const handleItemAdded = () => {
    fetchItems(); 
    setIsAddDrawerOpen(false); 
  };

  // Handle edit click
  const handleEditClick = (item) => {
    if (isAddDrawerOpen) {
      setIsAddDrawerOpen(false); // Close the add drawer if it's open
    }
    setEditItem(item);
    setIsEditDrawerOpen(true); // Open the edit drawer
  };

  // Handle item updated
  const handleItemUpdated = () => {
    fetchItems(); 
    setEditItem(null); 
    setIsEditDrawerOpen(false); 
  };

  // Handle delete item
  const handleDeleteItem = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/Inventory/${id}`);
        setItems(items.filter(item => item._id !== id));
      } catch (error) {
        console.error("Error deleting item", error);
      }
    }
  };

  // Effect to fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="inventory-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="./inv_logo.svg" alt="Logo" className="logo-img" />
            <span className='title'>DyogiQuest</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className="icon">
              <img className="icon" src='./dash_unsel.svg' alt="Dashboard" />
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

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Header */}
      <div className="header">
        <h2>All Items</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Item"
            value={searchQuery}
            onChange={handleSearch}
          />
          {filteredItems.length > 0 && (
            <Search results={filteredItems} onItemSelect={handleEditClick} />
          )}
        </div>
        <button className="add-button" onClick={toggleAddDrawer}>Add Item</button>
      </div>

      {/* Drawers for adding and editing items */}
      <EditItem
        isDrawerOpen={isEditDrawerOpen}
        toggleDrawer={() => setIsEditDrawerOpen(false)}
        itemToEdit={editItem}
        onItemUpdated={handleItemUpdated}
      />
      <AddItem 
        isDrawerOpen={isAddDrawerOpen} 
        toggleDrawer={toggleAddDrawer} 
        onItemAdded={handleItemAdded}
      />

      {/* Inventory Table */}
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
              <td>{item.itemName || "N/A"}</td>
              <td>{item.category || "N/A"}</td>
              <td>{item.AmountInStore || "N/A"}</td>
              <td>{item.manufacturer || "N/A"}</td>
              <td>{item.pricePHP || "N/A"}</td>
              <td>{item.serialNumber || "N/A"}</td>
              <td>{item.supplier || "N/A"}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteItem(item._id); }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
