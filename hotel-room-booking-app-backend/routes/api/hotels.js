const express = require('express');
const router = express.Router();
const hotelsController = require('../../controllers/hotels');

// Create a new hotel
router.post('/', hotelsController.createHotel);

// Get all hotels
router.get('/', hotelsController.getAllHotels);

// Get a hotel by id
router.get('/:id', hotelsController.getHotelById);

// Delete a hotel
router.delete('/:id', hotelsController.deleteHotel);

// Update a hotel
router.put('/:id', hotelsController.updateHotel);

module.exports = router;