// const Product = require('../models/product');

// // Thêm sản phẩm mới
// const addProduct = async (req, res) => {
//   const product = new Product(req.body);
//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Sửa sản phẩm
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     Object.assign(product, req.body);
//     const updatedProduct = await product.save();
//     res.json(updatedProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Xóa sản phẩm
// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Route cho /api/admin
// const adminArea = (req, res) => {
//     res.json({ message: 'Welcome to the admin area' });
// };

// module.exports = {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   adminArea
// };
