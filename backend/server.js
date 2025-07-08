// 📁 File: backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import eventRoutes from './routes/eventRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import purchaseRoutes from './routes/purchaseRoutes.js';
import {fileURLToPath} from 'url';

dotenv.config(); // ✅ Load .env file first

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/vite-project/dist')));
// Fallback to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/vite-project/dist/index.html'));
});
 
//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
 // console.log(`Server running on port ${PORT}`);
//});
// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/purchases", purchaseRoutes);

// Connect to local MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
