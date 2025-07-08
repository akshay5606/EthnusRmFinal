// backend/models/purchaseModel.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Purchase", purchaseSchema);
