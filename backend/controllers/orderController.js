const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;

    if (!shippingAddress) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    const user = await User.findById(req.userId).populate('cart.productId');

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalPrice = 0;
    const items = [];

    for (let cartItem of user.cart) {
      const product = await Product.findById(cartItem.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${cartItem.productId} not found` });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      items.push({
        productId: product._id,
        productName: product.name,
        price: product.price,
        quantity: cartItem.quantity,
      });

      totalPrice += product.price * cartItem.quantity;

      product.stock -= cartItem.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId: req.userId,
      items,
      totalPrice,
      shippingAddress,
    });

    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate('items.productId');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('items.productId');

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
