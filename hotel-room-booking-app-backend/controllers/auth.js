const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authController = {
  async register(req, res) {
    const { name, email, password, adharcard, phone } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        adharcard,
        phone
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      console.log('User saved to database');
      res.status(200).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  async profile(req, res) {
    try {
      const token = req.header('token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.user.id;

      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.status(200).json({
        name: user.name,
        email: user.email,
        adharcard: user.adharcard,
        phone: user.phone,
        bookings: user.bookings,
        whishlist: user.whishlist
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  async addTowishlist(req, res) {
    try {
      const token = req.header('token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.user.id;
      const hotelId = req.body.hotel;
      const user = await User.findById(userId);

      const isWished = user.whishlist?.some(hotel => hotel?.equals(hotelId));
      console.log(isWished);

      if (isWished) {
        return res.status(400).json({ msg: 'Hotel already in whishlist' });
      }

      user.whishlist.push(hotelId);
      await user.save();

      return res.status(200).json({ msg: 'Hotel added to wishlist' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },

  async removeFromWishlist(req, res) {
    try {
      const token = req.header('token');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.user.id;
      const hotelId = req.body.hotel;

      const user = await User.findById(userId);
      const isWished = user.whishlist?.some(hotel => hotel?.equals(hotelId));

      if (!isWished) {
        return res.status(400).json({ msg: 'Hotel not found in whishlist' });
      }

      user.whishlist = user.whishlist.filter(hotel => !hotel.equals(hotelId));
      await user.save();

      return res.status(200).json({ msg: 'Hotel removed from wishlist' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
};

module.exports = authController;