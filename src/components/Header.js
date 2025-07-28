import React from "react";
import "./Header.css";
import { FaUser, FaShoppingBag, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="main-header">
      <div className="free-shipping">FREE SHIPPING OVER ₹999</div>

      <div className="header-container">
        
      <div className="search-box">
            <select className="category-dropdown">
              <option>All Categories</option>
              <option>Bracelets</option>
              <option>Earrings</option>
              <option>Neckpieces</option>
              <option>Rings</option>
            </select>
            <input type="text" placeholder="Search Products..." className="search-input" />
            <button className="search-btn">
              <FaSearch />
            </button>
          </div>

        
        <div className="logo">Alistos</div>

        
        <div className="header-icons">
        <FaUser className="icon" />
        <FaShoppingBag className="icon" />
          
        </div>
      </div>

      
      <nav className="nav-menu">
        <ul>
          <li>HOME</li>
          <li>BRACELETS</li>
          <li>EARRINGS</li>
          <li>NECKPIECES</li>
          <li>RINGS</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
