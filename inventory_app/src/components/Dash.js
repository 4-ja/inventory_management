import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Dash.css';

const Dash = () => {
  const [mostStockItem, setMostStockItem] = useState(null);
  const [leastStockItem, setLeastStockItem] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProductsQuantity, setTotalProductsQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [slideIndex, setSlideIndex] = useState(0); // Carousel state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/Inventory');
        const data = response.data;

        if (data && data.length > 0) {
          const maxStockItem = data.reduce((max, item) =>
            (item.AmountInStore > max.AmountInStore ? item : max), data[0]);
          setMostStockItem(maxStockItem);

          const minStockItem = data.reduce((min, item) =>
            (item.AmountInStore < min.AmountInStore ? item : min), data[0]);
          setLeastStockItem(minStockItem);

          setTotalItems(data.length);
          const totalQuantity = data.reduce((sum, item) => sum + item.AmountInStore, 0);
          setTotalProductsQuantity(totalQuantity);

          const suppliersSet = new Set(data.map(item => item.supplier));
          const categoriesSet = new Set(data.map(item => item.category));

          setTotalSuppliers(suppliersSet.size);
          setTotalCategories(categoriesSet.size);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/login');
  };

  useEffect(() => {
    // Auto-update slide index every 1.5 seconds
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 2500);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const carouselItems = [
    {
      src: "./razer.webp",
      alt: "Razer",
      caption: "Razer"
    },
    {
      src: "./ASUS.webp",
      alt: "ASUS",
      caption: "ASUS"
    },
    {
      src: "./MSI.jpg",
      alt: "MSI",
      caption: "MSI"
    }
  ];

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <img src="./inv_logo.svg" alt="Logo" className="logo-img" />
            <span className='title'>DyogiQuest</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/dashboard" className="active">
              <img className="icon" src='./dash_selected.svg' alt="Dashboard" />
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/items" className="icon">
              <img className="icon" src='./items_unsel.svg' alt="Items" />
              <span className="nav-text">Items</span>
            </Link>
          </li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="main-content">
        <header>
          <div className="greeting">
            <h1>Hello {userName} 👋</h1>
            <p>Good Morning</p>
          </div>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="sections">
            <section className="recently-added">
              <h2>Most in Stock</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Serial Number</th>
                    <th>Supplier</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {mostStockItem && (
                    <tr>
                      <td>{mostStockItem.itemName}</td>
                      <td>{mostStockItem.serialNumber}</td>
                      <td>{mostStockItem.supplier}</td>
                      <td>{mostStockItem.AmountInStore} pcs</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>

            <section className="top-rated">
              <h2>Least in Stock</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Serial Number</th>
                    <th>Supplier</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {leastStockItem && (
                    <tr>
                      <td>{leastStockItem.itemName}</td>
                      <td>{leastStockItem.serialNumber}</td>
                      <td>{leastStockItem.supplier}</td>
                      <td>{leastStockItem.AmountInStore} pcs</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </div>
        )}

        <div className="summaries">
          <div className="item-summary">
            <h3>Items Summary</h3>
            <p>Total Unique Items: <strong>{totalItems}</strong></p>
            <p>Total Products Quantity: <strong>{totalProductsQuantity}</strong> pcs</p>
          </div>
          <div className="product-summary">
            <h3>Product Summary</h3>
            <p>Number of Suppliers: <strong>{totalSuppliers}</strong></p>
            <p>Number of Categories: <strong>{totalCategories}</strong></p>
          </div>
        </div>

        <div className="carousel-container">
          <h2>Product Showcase</h2>
          <div className="carousel-slide">
            {carouselItems.map((item, index) => (
              <div className={`carousel-item ${index === slideIndex ? "active" : "inactive"}`} key={index}>
                <img src={item.src} alt={item.alt} />
                <div className="carousel-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
