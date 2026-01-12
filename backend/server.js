require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* =========================
   CORS — FIXED (ONLY ONCE)
   ========================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://acmzon.vercel.app"
  ],
  credentials: true
}));

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());

/* =========================
   ROUTES
   ========================= */
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

/* =========================
   HEALTH CHECK
   ========================= */
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

/* =========================
   ERROR HANDLER
   ========================= */
app.use(errorHandler);

/* =========================
   DATABASE
   ========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) =>
    console.error('MongoDB connection failed:', error)
  );

/* =========================
   SERVER
   ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
