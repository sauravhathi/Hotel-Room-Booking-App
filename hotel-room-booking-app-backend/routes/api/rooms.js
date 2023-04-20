const express = require('express');
const router = express.Router();
const roomsController = require('../../controllers/rooms');

// Create a new room
router.post('/', roomsController.createRoom);

// Get all rooms
router.get('/', roomsController.getAllRooms);

// Delete a room
router.delete('/:id', roomsController.deleteRoom);

// Update a room
router.put('/:id', roomsController.updateRoom);

module.exports = router;