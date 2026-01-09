const express = require('express');
const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
  clearCart,
} = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.put('/update', authMiddleware, updateCartQuantity);
router.get('/', authMiddleware, getCart);
router.delete('/clear', authMiddleware, clearCart);

module.exports = router;
