const express = require('express');
const { getUserOrders, createOrder } = require('../controllers/orderController');
const router = express.Router();

// Đặt hàng
router.post('/', createOrder);

// Lấy danh sách đơn hàng của người dùng
router.get('/:userId', getUserOrders);

module.exports = router;
