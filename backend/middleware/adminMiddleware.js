// middleware/authMiddleware.js  
const jwt = require('jsonwebtoken');  
const User = require('../models/user');  

const authenticate = async (req, res, next) => {  
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header  
  if (!token) return res.status(401).json({ message: 'No token provided' });  

  try {  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.userId = decoded.id; // Attach userId to req  
    next();  
  } catch (err) {  
    res.status(401).json({ message: 'Invalid token' });  
  }  
};  

// Assuming User model has admin property to check admin status  
const isAdmin = async (req, res, next) => {  
  try {  
    const user = await User.findById(req.userId);  
    if (!user || !user.isAdmin) {  
      return res.status(403).json({ message: 'Access denied' });  
    }  
    next();  
  } catch (err) {  
    res.status(500).json({ message: 'Server error' });  
  }  
};  

module.exports = {  
  authenticate,  
  isAdmin,  
};  