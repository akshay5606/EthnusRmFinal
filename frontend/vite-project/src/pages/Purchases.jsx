import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
 
  const userId = localStorage.getItem("userId");
  console.log("User ID from local storage:", userId);
 
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('/api/purchases', {
          params: { userId },
        });
setPurchases(res.data);
      } catch (err) {
        console.error("Failed to fetch purchases", err);
      }
    };
 
    if (userId) {
      fetchPurchases();
    }
  }, [userId]);
 
  return (
    <div>
      <h1>Past Purchases</h1>
      <ul>
{Array.isArray(purchases) && purchases.map((item, idx) => (
          <li key={idx}>
{item.title} — {item.date} — ₹{item.price} (Qty: {item.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Purchases;
