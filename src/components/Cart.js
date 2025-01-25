import React from "react";
import "./Cart.css";

const Cart = ({ cart, onClose }) => {
  return (
    <div className="cart-container">
      <button className="close-cart" onClick={onClose}>×</button>
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div>
                <p>{item.name}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
