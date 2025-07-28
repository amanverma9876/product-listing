import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemCard from "./components/ItemCard";
import ProductPopup from "./components/ProductPopup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_URL = "https://fakestoreapi.com/products";

const SortAndViewOptions = ({ totalProducts, currentView, setCurrentView, onSortChange }) => {
  const [sortBy, setSortBy] = useState("Default");

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3">
      <div>
        <strong>Total Products:</strong> {totalProducts}
      </div>
      <div>
        <label className="me-2">Sort by:</label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="Default">Default</option>
          <option value="Price Low to High">Price Low to High</option>
          <option value="Price High to Low">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [popupProduct, setPopupProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState("grid");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
          setSortedProducts(data);
        } else {
          console.error("Invalid API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (sortOption) => {
    let sorted = [...products];
    if (sortOption === "Price Low to High") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Price High to Low") {
      sorted.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  const addToCart = (product) => {
    if (!product || !product.id) return;
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleProductClick = (product) => {
    setPopupProduct(product);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div>
      <Header
        cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      <SortAndViewOptions
        totalProducts={products.length}
        currentView={currentView}
        setCurrentView={setCurrentView}
        onSortChange={handleSortChange}
      />

      <div className={`product-list d-flex flex-wrap gap-3 p-3 ${currentView}`}>
        {sortedProducts.length === 0 ? (
          <p>No products available. Please check the API.</p>
        ) : (
          sortedProducts.map((product) => (
            <ItemCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
              onAddToCart={addToCart}
            />
          ))
        )}
      </div>

      {popupProduct && (
        <ProductPopup
          product={popupProduct}
          onClose={() => setPopupProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {showCart && (
        <div className="cart-modal p-4 bg-light border rounded shadow position-fixed top-25 start-50 translate-middle" style={{ zIndex: 1050, minWidth: "300px" }}>
          <h4 className="mb-3">Your Cart</h4>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.title}
                  <span className="badge bg-primary rounded-pill">Qty: {item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
          <button className="btn btn-secondary" onClick={handleCloseCart}>
            Close
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
