import React from "react";

function ItemCard({ product, onProductClick }) {
  return (
    <div
      className="card"
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={() => onProductClick(product)}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title} 
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5> 
        <p className="card-text fw-bold">${product.price}</p> 
        <p className="card-text">{product.category}</p> 
      </div>
    </div>
  );
}

export default ItemCard;
