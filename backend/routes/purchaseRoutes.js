import express from "express";
import Purchase from "../models/purchaseModel.js";
 
const router = express.Router();
 
// GET purchases for a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
 
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
 
  try {
    const purchases = await Purchase.find({ userId }).populate("eventId");
 
    res.json(
purchases.map((p) => ({
        title: p.eventId.title,
date: p.eventId.date,
        price: p.eventId.price,
        quantity: p.quantity,
        timestamp: p.timestamp,
      }))
    );
  } catch (err) {
    console.error("❌ Error fetching purchases:", err);
    res.status(500).json({ message: "Server error fetching purchases" });
  }
});
 
// POST a new purchase
router.post("/", async (req, res) => {
  const { userId, eventId, quantity } = req.body;
 
  if (!userId || !eventId || !quantity) {
    return res.status(400).json({ message: "userId, eventId, and quantity are required" });
  }
 
  try {
    const purchase = await Purchase.create({ userId, eventId, quantity });
    res.status(201).json(purchase);
  } catch (err) {
    console.error("❌ Error creating purchase:", err);
    res.status(500).json({ message: "Server error creating purchase" });
  }
});

// router.get("/", auth, async (req, res) => {
//   const purchases = await Purchase.find({ userId: req.user.id }).populate("eventId");
//   res.json(purchases.map(p => ({
//     title: p.eventId.title,
//     date: p.eventId.date,
//     price: p.eventId.price,
//     quantity: p.quantity,
//     timestamp: p.timestamp
//   })));
// });

// router.post("/", auth, async (req, res) => {
//   const { eventId, quantity } = req.body;
//   const purchase = await Purchase.create({ userId: req.user.id, eventId, quantity });
//   res.status(201).json(purchase);
// });

export default router;
