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
        alt={product.Name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.Name}</h5>
        <p className="card-text">{product.Desc}</p>
        <p className="card-text fw-bold">${product.Price}</p>
        <p className="Card-text">{product.Categories}</p>
      </div>
    </div>
  );
}

export default ItemCard;
