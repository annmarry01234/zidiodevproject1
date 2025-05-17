const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // ✅ Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  uploadHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
