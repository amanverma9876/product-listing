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
  const [ setSortBy] = useState("Default");

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
    onSortChange(selectedSort);
  };
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
    const sorted = [...products];
    setSortedProducts(sorted);
  };

  const addToCart = (product) => {
    if (!product || !product.id) return;

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
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

  return (
    <div>
      <Header cartCount={cart.reduce((total, item) => total + item.quantity, 0)} onCartClick={() => setShowCart(true)} />

      <SortAndViewOptions totalProducts={products.length} currentView={currentView} setCurrentView={setCurrentView} onSortChange={handleSortChange} />

      <div className={`product-list d-flex flex-wrap gap-3 p-3 ${currentView}`}>
        {sortedProducts.length === 0 ? (
          <p>No products available. Please check the API.</p>
        ) : (
          sortedProducts.map((product) => (
            <ItemCard key={product.id} product={product} onProductClick={handleProductClick} />
          ))
        )}
      </div>

      {popupProduct && <ProductPopup product={popupProduct} onClose={() => setPopupProduct(null)} onAddToCart={addToCart} />}

      

      <Footer />
    </div>
  );
}

export default App;