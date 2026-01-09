const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/all', authMiddleware, adminMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
