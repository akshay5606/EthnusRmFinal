// backend/routes/purchaseRoutes.js
import express from "express";
import auth from "../middleware/authMiddleware.js";
import Purchase from "../models/purchaseModel.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const purchases = await Purchase.find({ userId: req.user.id }).populate("eventId");
  res.json(purchases.map(p => ({
    title: p.eventId.title,
    date: p.eventId.date,
    price: p.eventId.price,
    quantity: p.quantity,
    timestamp: p.timestamp
  })));
});

router.post("/", auth, async (req, res) => {
  const { eventId, quantity } = req.body;
  const purchase = await Purchase.create({ userId: req.user.id, eventId, quantity });
  res.status(201).json(purchase);
});

export default router;
