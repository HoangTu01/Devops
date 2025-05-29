const express = require('express');
const {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const router = express.Router();

// Lấy danh sách người dùng
router.get('/', getAllUsers);

// Đăng ký người dùng mới
router.post('/', registerUser);

// Đăng nhập người dùng
router.post('/login', loginUser);

// Sửa thông tin người dùng
router.put('/:id', updateUser);

// Xóa người dùng
router.delete('/:id', deleteUser);

module.exports = router;
