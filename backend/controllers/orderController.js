const Order = require('../models/order');

// Lấy danh sách đơn hàng của người dùng
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo đơn hàng mới
const createOrder = async (req, res) => {
  const { userId, products } = req.body;

  const totalAmount = products.reduce((total, item) => total + item.price * item.quantity, 0);

  const order = new Order({ userId, products, totalAmount });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getUserOrders,
  createOrder
};
