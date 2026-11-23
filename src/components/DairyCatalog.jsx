import React, { useState } from 'react';
import { DAIRY_PRODUCTS } from '../data/dairyProducts';
import ProductCard from './ProductCard';

// 'user' baad mein login se aayega; abhi nahi aaya toh null rahega
function DairyCatalog({ user = null, onProceedToCheckout = () => {} }) {
  // Cart mein store hoga: { productId: quantity }, jaise { 1: 2, 4: 1 }
  const [cart, setCart] = useState({});

  // '+' button dabane par quantity 1 badhane ka function
  const handleAdd = (productId) => {
    const updatedCart = {};
    // Pehle purani cart ki values naye object mein copy karte hain
    for (const id in cart) {
      updatedCart[id] = cart[id];
    }

    // Agar product pehle se hai toh +1 karo, warna 1 se start karo
    if (updatedCart[productId]) {
      updatedCart[productId] = updatedCart[productId] + 1;
    } else {
      updatedCart[productId] = 1;
    }

    setCart(updatedCart);
  };

  // '-' button dabane par quantity 1 ghatane ka function
  const handleRemove = (productId) => {
    const updatedCart = {};
    for (const id in cart) {
      updatedCart[id] = cart[id];
    }

    // 1 ya usse kam hone par cart se remove kar dete hain
    if (!updatedCart[productId] || updatedCart[productId] <= 1) {
      delete updatedCart[productId];
    } else {
      updatedCart[productId] = updatedCart[productId] - 1;
    }

    setCart(updatedCart);
  };

  // Simple 'for' loop se total bill, selected items count, aur product cards banate hain
  let totalAmount = 0;
  let selectedCount = 0;
  const cards = [];

  for (let i = 0; i < DAIRY_PRODUCTS.length; i++) {
    const product = DAIRY_PRODUCTS[i];
    const qty = cart[product.id] || 0;

    if (qty > 0) {
      totalAmount = totalAmount + product.price * qty;
      selectedCount = selectedCount + 1;
    }

    cards.push(
      <ProductCard
        key={product.id}
        product={product}
        quantity={qty}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Ayansh Dairy Farm</h2>
      <p style={{ color: '#555' }}>Fresh Dairy Catalog & Cart</p>

      {/* Agar user logged in hai toh uska naam dikhayega */}
      {user && (
        <p style={{ fontWeight: 'bold' }}>
          Logged in as: {user.fullName || user.email}
        </p>
      )}

      {/* 10 products ke cards */}
      <div>{cards}</div>

      {/* Total bill summary box */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          border: '1px solid #888',
          borderRadius: '8px',
          textAlign: 'left',
        }}
      >
        <div>
          <strong>Total Bill: ₹{totalAmount}</strong>
        </div>
        <div style={{ fontSize: '13px', color: '#555' }}>
          Items selected: {selectedCount}
        </div>

        <button
          type="button"
          disabled={selectedCount === 0}
          onClick={() => onProceedToCheckout(cart)}
          style={{
            marginTop: '10px',
            padding: '8px 14px',
            cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default DairyCatalog;