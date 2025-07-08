import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('/api/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPurchases(res.data);
      } catch (err) {
        console.error("Failed to fetch purchases", err);
      }
    };

    if (token) fetchPurchases();
  }, [token]);

  return (
    <div>
      <h1>Past Purchases</h1>
      <ul>
        {Array.isArray(purchases)  && purchases.map((item, idx) => (
          <li key={idx}>{item.title} — {item.date} — ₹{item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
