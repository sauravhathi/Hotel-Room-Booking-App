const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Bodyparser middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// DB Config
const db = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('🚀 MongoDB Connected...'))
    .catch((err) => console.log(err));

// Routes
const auth = require('./routes/api/auth');
const bookings = require('./routes/api/bookings');
const hotels = require('./routes/api/hotels');
const rooms = require('./routes/api/rooms');

// Use Routes
app.use('/api/auth', auth);
app.use('/api/bookings', bookings);
app.use('/api/hotels', hotels);
app.use('/api/rooms', rooms);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`✈️  Server running on port http://localhost:${port}`));