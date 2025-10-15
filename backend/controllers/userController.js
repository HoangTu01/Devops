const User = require('../models/user');
const bcrypt = require('bcryptjs');


// Lấy danh sách người dùng
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: `Error retrieving users: ${err.message}` });
  }
};

// Đăng ký người dùng mới
const registerUser = async (req, res) => {
  const { username, password, email, isAdmin } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }

  // Kiểm tra định dạng email
  const emailRegex = /.+\@.+\..+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = new User({
    username,
    password: await bcrypt.hash(password, 10),
    email,
    isAdmin: isAdmin || false
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: `Error creating user: ${err.message}` });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin });
  } catch (err) {
    res.status(500).json({ message: `Error logging in: ${err.message}` });
  }
};

// Sửa thông tin người dùng
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, isAdmin, password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cập nhật thông tin người dùng
    if (username) user.username = username;
    if (email) user.email = email;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    if (password) user.password = await bcrypt.hash(password, 10); // Mã hóa mật khẩu mới

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: `Error updating user: ${err.message}` });
  }
};

// Xóa người dùng
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err); // Ghi nhật ký lỗi
    res.status(500).json({ message: `Error deleting user: ${err.message}` });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
};
