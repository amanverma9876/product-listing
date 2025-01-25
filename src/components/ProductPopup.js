import React, { useState } from "react";
import "./ProductPopup.css";

const ProductPopup = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  console.log("Popup Product Data:", product); // Debugging

  // Handle missing data safely
  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://interview.gdev.gosbfy.com/api/files/${product.collectionId}/${product.id}/${product.image || ""}`;

  const productName = product.name || product.Name || "Unknown Product";
  const productDescription = product.description || product.Desc || "No description available.";
  const productPrice = product.price ? product.price.toFixed(2) : "0.00";
  const productSku = product.sku || "N/A";
  const productCategories = product.categories?.length ? product.categories.join(" | ") : "None";
  const productTags = product.tags?.length ? product.tags.join(" | ") : "None";

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };
  const handleAddToCart = () => {
    console.log("Product to Add:", product); // Debugging
  
    if (!product) {
      console.error("Error: No product data available");
      return;
    }
  
    onAddToCart({
      id: product.id,
      name: product.name || "No Name",
      price: product.price || 0,
      image: product.image || "https://via.placeholder.com/300",
      quantity: 1,
    });
  
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {/* Left: Product Image */}
        <div className="popup-image-container">
          <img
            src={imageUrl}
            alt={productName}
            className="popup-image"
          />
        </div>

        {/* Right: Product Details */}
        <div className="popup-details">
          <h1 className="product-title">{productName}</h1>
          <p className="product-price">${productPrice}</p>
          <p className="product-availability">
            <strong>Available:</strong> <span className="in-stock">In-stock</span>
          </p>
          <p className="product-description">{productDescription}</p>

          {/* Quantity & Add to Cart */}
          <div className="product-actions">
            <div className="quantity-container">
              <button onClick={() => handleQuantityChange("decrease")}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange("increase")}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>Add to cart</button>
            <button className="wishlist-btn">♡</button>
          </div>

          {/* SKU, Categories & Tags */}
          <p className="sku"><strong>SKU:</strong> {productSku}</p>
          <p className="categories"><strong>Categories:</strong> {productCategories}</p>
          <p className="tags"><strong>Tags:</strong> {productTags}</p>
          <p className="share-items"><strong>Share this item:</strong></p>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
