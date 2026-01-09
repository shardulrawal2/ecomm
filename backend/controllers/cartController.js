const User = require('../models/User');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.userId);

    const existingItem = user.cart.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Added to cart',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const user = await User.findById(req.userId);

    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Removed from cart',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID and quantity are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const user = await User.findById(req.userId);

    const cartItem = user.cart.find((item) => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('cart.productId');

    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
