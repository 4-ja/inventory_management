import React from 'react';
import './Dash.css';
import { Link } from 'react-router-dom';

const Dash = () => {
  return (
        <div>
<div class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="./inv_logo.svg" alt="Logo" class="logo-img"/>
                <span class='title'>Inventory</span>
            </div>
        </div>
        <ul class="nav-links">
        <li>
              <Link to="/dashboard" class="active">
                <img class="icon" src='./dash_selected.svg'></img><span class="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/items" class = "icon">
              <img class="icon" src='./items_unsel.svg'></img><span class="nav-text">Items</span>
              </Link>
            </li>
        </ul>
    </div>

    <div class="main-content">
        <header>
            <div class="greeting">
                <h1>Hello /User/ 👋</h1>
                <p>Good Morning</p>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Search..."/>
                <button>🔍</button>
            </div>
        </header>

        <div class="sections">
            <section class="recently-added">
                <h2>Recently Added</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Image</th>
                            <th>Store</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gas Kitting</td>
                            <td><img src="path/to/image.png" alt="Gas Kitting"/></td>
                            <td>22 House Store</td>
                            <td>1 pcs</td>
                        </tr>


                    </tbody>
                </table>
            </section>

            <section class="top-rated">
                <h2>Top Rated</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Asset Name</th>
                            <th>Image</th>
                            <th>Store</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Gas Kitting</td>
                            <td><img src="path/to/image.png" alt="Gas Kitting"/></td>
                            <td>22 House Store</td>
                            <td>1 pcs</td>
                        </tr>



                    </tbody>
                </table>
            </section>
        </div>

        <div class="summaries">
            <div class="item-summary">
                <h3>Item Summary</h3>
                <p>Quantity in Hand: <strong>868</strong></p>
                <p>To be received: <strong>200</strong></p>
            </div>
            <div class="product-summary">
                <h3>Product Summary</h3>
                <p>Number of Suppliers: <strong>31</strong></p>
                <p>Number of Categories: <strong>21</strong></p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dash