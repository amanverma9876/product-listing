import React from "react";
import { FaUser, FaHeart, FaShoppingBag, FaSearch, FaBars } from "react-icons/fa";
import "./Header.css";

const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="header">

      <div className="search-container">
        <input type="text" placeholder="Search Anything..." className="search-input" />
        <FaSearch className="search-icon" />
      </div>

      <h1 className="logo">Helendo</h1>
      <div className="header-icons">
        <FaUser className="icon" />
        <FaHeart className="icon" />

        <div className="icon-container cart-icon" onClick={onCartClick}>
          <FaShoppingBag className="icon" />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>

        <FaBars className="icon" />
      </div>
    </header>
  );
};

export default Header;
