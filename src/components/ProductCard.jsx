import React from 'react';

// Ek single product row/card dikhane wala component
function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px 14px',
        marginBottom: '10px',
        textAlign: 'left',
      }}
    >
      {/* Product ka naam, unit aur price */}
      <div>
        <strong>{product.name}</strong>
        <div style={{ fontSize: '13px', color: '#555' }}>
          {product.unit} — ₹{product.price}<br/>
          {product.brand} - {product.perishable ? 'Perishable' : 'Non-Perishable'}
        </div>
      </div>

      {/* '-' aur '+' quantity buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px',color:"grey" }}>
        <button type="button" onClick={() => onRemove(product.id)}>
          -
        </button>
        <span>{quantity}</span>
        <button type="button" onClick={() => onAdd(product.id)}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;