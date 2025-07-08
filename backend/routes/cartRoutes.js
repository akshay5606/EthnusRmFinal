import express from "express";
import Cart from "../models/cartModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.eventId");
  res.json(cart || { userId: req.user.id, items: [] });
});

// Add to cart
router.post("/add", auth, async (req, res) => {
  const { eventId } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const existing = cart.items.find(i => i.eventId.toString() === eventId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ eventId, quantity: 1 });
  }
  await cart.save();
  res.json(cart);
});

// Clear cart after purchase
router.post("/clear", auth, async (req, res) => {
  await Cart.deleteOne({ userId: req.user.id });
  res.json({ message: "Cart cleared" });
});

export default router;
