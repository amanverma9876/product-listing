import React from "react";

function ItemCard({ product, onProductClick, onAddToCart }) {
  return (
    <div
      className="card"
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
        onClick={() => onProductClick(product)}
      />
      <div className="card-body">
        <h5 className="card-title" onClick={() => onProductClick(product)}>
          {product.title}
        </h5>
        <p className="card-text fw-bold">${product.price}</p>
        <p className="card-text">{product.category}</p>
        <button className="btn btn-primary" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
