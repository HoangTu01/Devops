const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: String, // Hoặc Number, tùy thuộc vào định dạng ID bạn muốn
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', productSchema);
