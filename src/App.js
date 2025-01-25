import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaThLarge, FaTh, FaGripHorizontal } from "react-icons/fa"; 
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import ProductPopup from "./components/ProductPopup";
import CartSidebar from "./components/CartSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_URL = "https://interview.gdev.gosbfy.com/api/collections/Products/records";
const IMAGE_URL_TEMPLATE = "https://interview.gdev.gosbfy.com/api/files/";

const SortAndViewOptions = ({ totalProducts, currentView, setCurrentView, onSortChange }) => {
  const [sortBy, setSortBy] = useState("Default");

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-3 gap-3">
      
      <div className="d-flex align-items-center gap-3">
        <div className="showing-text">Showing 1-9 of {totalProducts}</div>
       
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="Default">Default</option>
            <option value="Price Low to High">Price: Low to High</option>
            <option value="Price High to Low">Price: High to Low</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </div>
  
     
      <div className="view-icons d-flex gap-2">
        <FaThLarge
          className={`view-icon ${currentView === "grid" ? "active" : ""}`}
          onClick={() => setCurrentView("grid")}
        />
        <FaTh
          className={`view-icon ${currentView === "list" ? "active" : ""}`}
          onClick={() => setCurrentView("list")}
        />
        <FaGripHorizontal
          className={`view-icon ${currentView === "compact" ? "active" : ""}`}
          onClick={() => setCurrentView("compact")}
        />
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
        console.log("API Response:", data);

        if (data && data.items) {
          const formattedProducts = data.items.map((item) => ({
            ...item,
            image: `${IMAGE_URL_TEMPLATE}${item.collectionId}/${item.id}/${item.image}`,
          }));
          setProducts(formattedProducts);
          setSortedProducts(formattedProducts);
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
    const sorted = [...products];
    switch (sortOption) {
      case "Price Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Price High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
    }
    setSortedProducts(sorted);
  };

 
  const addToCart = (product) => {
    if (!product || !product.id) return;

    const newProduct = {
      id: product.id,
      name: product.name || "Unknown Product",
      price: product.price ? parseFloat(product.price) : 0,
      image: product.image
        ? `${product.image}`
        : "https://via.placeholder.com/100",
      quantity: 1,
    };

    console.log("🛒 Adding to Cart:", newProduct); 

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, newProduct];
      }
    });

    console.log("📦 Updated Cart:", cart); 
  };

  const handleProductClick = (product) => {
    console.log("Product Clicked:", product);
    setPopupProduct(product);
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

     
      <div
        className={`product-list d-flex flex-wrap gap-3 p-3 ${currentView}`}
      >
        {sortedProducts.length === 0 ? (
          <p>No products available. Please check the API.</p>
        ) : (
          sortedProducts.map((product) => (
            <ItemCard
              key={product.id}
              product={product}
              onProductClick={handleProductClick}
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
        <div className="cart-sidebar open">
          <CartSidebar cartItems={cart} onClose={() => setShowCart(false)} />
        </div>
      )}
    </div>
  );
}

export default App;