import React, { useState } from 'react';
import { DAIRY_PRODUCTS } from '../data/dairyProducts';
import './CheckoutPage.css';

function CheckoutPage({ cart, user = null, onBackToCatalog, onNavigateAuth }) {
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('India');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedRows = [];
  const orderItems = [];
  let totalAmount = 0;

  // Simple 'for' loop se sirf wahi products nikalte hain jinki quantity > 0 hai
  for (let i = 0; i < DAIRY_PRODUCTS.length; i++) {
    const product = DAIRY_PRODUCTS[i];
    const qty = cart[product.id] || 0;

    if (qty > 0) {
      const itemSubtotal = product.price * qty;
      totalAmount = totalAmount + itemSubtotal;

      orderItems.push({
        productName: product.name,
        unitPrice: Number(product.price),
        quantity: Number(qty),
      });

      selectedRows.push(
        <div key={product.id} className="checkout-item">
          <div>
            <strong>{product.name}</strong>
            <div className="checkout-item-sub">
              {product.unit} | ₹{product.price} x {qty}
            </div>
          </div>

          <div>
            <strong>₹{itemSubtotal}</strong>
          </div>
        </div>
      );
    }
  }

  // Backend mein order save karne aur phir auth flow chalane ka handler
  const handleFinalCheckoutClick = async () => {
    if (orderItems.length === 0) {
      alert('Pehle kam se kam ek product select kijiye!');
      return;
    }

    if (!customerName.trim() || !phone.trim() || !pinCode.trim() || !city.trim()) {
      alert('Kripya Name, Phone, Pin Code aur City bhar dijiye.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: customerName.trim(),
        phone: phone.trim(),
        country: country.trim() || 'India',
        pinCode: pinCode.trim(),
        city: city.trim(),
        orderSource: 'WEB',
        items: orderItems,
      };

      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Order save nahi ho paya');
      }

      const savedOrder = await response.json();
      console.log('Saved in MySQL:', savedOrder);
      alert(`Order #${savedOrder.id} save ho gaya! Total: ₹${savedOrder.totalAmount}`);

      if (user) {
        onNavigateAuth('login');
      } else {
        onNavigateAuth('register');
      }
    } catch (error) {
      console.error('Order submit error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Selected Products & Checkout</h2>

      {selectedRows.length === 0 ? (
        <p className="checkout-item-sub">Aapne abhi tak koi product select nahi kiya hai.</p>
      ) : (
        <div>{selectedRows}</div>
      )}

      <div className="checkout-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="checkout-total-box">
        <strong>Final Total: ₹{totalAmount}</strong>
        <div className="checkout-status-text">
          {user
            ? 'Logged-in user: Final Checkout will save order & open Login.'
            : 'New/Guest user: Final Checkout will save order & open Register.'}
        </div>
      </div>

      <div className="checkout-actions">
        <button type="button" className="checkout-back-btn" onClick={onBackToCatalog}>
          Back to Catalog
        </button>

        <button
          type="button"
          className="checkout-final-btn"
          onClick={handleFinalCheckoutClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving Order...' : 'Final Checkout'}
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;