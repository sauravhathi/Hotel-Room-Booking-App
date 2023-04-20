const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  adharcard: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    }
  ],
  whishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('UserHotel', userSchema);

module.exports = User;