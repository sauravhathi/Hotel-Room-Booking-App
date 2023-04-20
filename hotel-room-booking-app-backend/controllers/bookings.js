const Booking = require('../models/booking');

const createBooking = async (req, res) => {
  try {
    const { roomId, guestName, guestPhone, guestEmail, guestIdentityCard, checkInDate, checkOutDate, totalPrice } = req.body;

    const booking = new Booking({
      roomId,
      guestName,
      guestPhone,
      guestEmail,
      guestIdentityCard,
      checkInDate,
      checkOutDate,
      totalPrice
    });

    await booking.save();

    res.status(201).json({ message: 'Booking created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.remove();

    res.status(200).json({ message: 'Booking removed' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const { roomId, guestName, guestPhone, guestEmail, guestIdentityCard, checkInDate, checkOutDate, totalPrice, status } = req.body;

    if (roomId) booking.roomId = roomId;
    if (guestName) booking.guestName = guestName;
    if (guestPhone) booking.guestPhone = guestPhone;
    if (guestEmail) booking.guestEmail = guestEmail;
    if (guestIdentityCard) booking.guestIdentityCard = guestIdentityCard;
    if (checkInDate) booking.checkInDate = checkInDate;
    if (checkOutDate) booking.checkOutDate = checkOutDate;
    if (totalPrice) booking.totalPrice = totalPrice;
    if (status) booking.status = status;

    await booking.save();

    res.status(200).json({ message: 'Booking updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  updateBooking
};