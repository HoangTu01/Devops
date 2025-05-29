const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/', getAllProducts);

// Thêm sản phẩm mới
router.post('/', createProduct);

// Sửa sản phẩm
router.put('/:id', updateProduct);

// Xóa sản phẩm
router.delete('/:id', deleteProduct);

module.exports = router;
