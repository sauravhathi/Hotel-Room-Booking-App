const express = require('express');
const router = express.Router();
const bookingsController = require('../../controllers/bookings');

// Create a new booking
router.post('/', bookingsController.createBooking);

// Get all bookings
router.get('/', bookingsController.getAllBookings);

// Delete a booking
router.delete('/:id', bookingsController.deleteBooking);

// Update a booking
router.put('/:id', bookingsController.updateBooking);

module.exports = router;