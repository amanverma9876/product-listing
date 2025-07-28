import React, { useState } from "react";
import "./ProductPopup.css";

const ProductPopup = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const imageUrl = product.image?.startsWith("http") ? product.image : "https://via.placeholder.com/300";
  const productName = product.title || "Unknown Product"; 
  const productDescription = product.description || "No description available.";
  const productPrice = product.price ? product.price.toFixed(2) : "0.00";
  const productCategory = product.category || "Uncategorized";

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name: product.title || "No Name",
      price: product.price || 0,
      image: product.image || "https://via.placeholder.com/300",
      quantity: quantity,
    });

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="popup-image-container">
          <img src={imageUrl} alt={productName} className="popup-image" />
        </div>

        <div className="popup-details">
          <h1 className="product-title">{productName}</h1>
          <p className="product-price">${productPrice}</p>
          <p className="product-category">
            <strong>Category:</strong> {productCategory}
          </p>
          <p className="product-description">{productDescription}</p>

          <div className="product-actions">
            <div className="quantity-container">
              <button onClick={() => handleQuantityChange("decrease")}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange("increase")}>+</button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
