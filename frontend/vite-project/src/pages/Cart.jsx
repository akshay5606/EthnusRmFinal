import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(stored) ? stored : []);
    } catch {
      setCart([]);
    }
  }, []);

  const token = localStorage.getItem("token");

  const buyAll = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID missing, please login again");
      return;
    }
 
    for (let item of cart) {
      // You can still do event-specific logic here if needed
await axios.post('/api/purchases', {
        userId,
        eventId: item._id,
        quantity: item.quantity,
      });
    }
 
    alert("Tickets purchased!");
    localStorage.removeItem("cart");
    setCart([]);
  } catch (err) {
    console.error("Purchase failed", err);
    alert("Failed to purchase tickets.");
  }
};

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {Array.isArray(cart) && cart.map(item => (
              <li key={item._id}>
                <div>
                  <strong>{item.title}</strong> — ₹{item.price} × {item.quantity}
                </div>
                <button onClick={() => removeItem(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={buyAll}>Buy All Tickets</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
