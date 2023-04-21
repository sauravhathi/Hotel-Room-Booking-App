const Room = require('../models/room');

// Create a new room
const createRoom = async (req, res) => {
  const { roomNumber, type, price, description, hotel } = req.body;

  try {
    const room = await Room.create({
      roomNumber,
      type,
      price,
      description,
      hotel
    });

    res.status(201).json({ message: 'Room created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    
    res.status(200).json({ rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await room.remove();

    res.status(200).json({ message: 'Room removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const { roomNumber, type, price, description, hotel } = req.body;

    if (roomNumber) room.roomNumber = roomNumber;
    if (type) room.type = type;
    if (price) room.price = price;
    if (description) room.description = description;
    if (hotel) room.hotel = hotel;

    await room.save();

    res.status(200).json({ message: 'Room updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  deleteRoom,
  updateRoom
};