import React from "react";
import "./CartSidebar.css";

const CartSidebar = ({ cartItems, onClose }) => {

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  console.log("🛍️ Cart Items:", cartItems);

  return (
    <div className="cart-sidebar open">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>


      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name || "Unknown Product"}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{item.name || "Unknown Product"}</h4>
                <p>{item.description || "No description available"}</p>
                <p>Price: ${item.price ? item.price.toFixed(2) : "0.00"}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3>Subtotal: ${subtotal}</h3>
      <div className="cart-footer">
        <button className="view-cart-btn">View Cart</button>
        <br></br>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;
