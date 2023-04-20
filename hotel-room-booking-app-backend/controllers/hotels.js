const Hotel = require('../models/hotel');

// Create a new hotel
const createHotel = async (req, res) => {
    try {
        const { name, description, thumbnail, photos, facilities, totalBookings, rating, minPrice, maxPrice, type, address } = req.body;

        const hotel = new Hotel({
            name,
            description,
            thumbnail,
            photos,
            facilities,
            totalBookings,
            rating,
            minPrice,
            maxPrice,
            type,
            address
        });

        await hotel.save();

        res.status(201).json({ message: 'Hotel created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Get all hotels
const getAllHotels = async (req, res) => {
    console.log(req.query);
    const { query, location, price, type, available, inDate, outDate } = req.query;
    const filters = {};
    if (query) {
        filters.name = { $regex: query, $options: 'i' };
    }
    if (location) {
        filters.$or = [
            { 'address.street': { $regex: location, $options: 'i' } },
            { 'address.city': { $regex: location, $options: 'i' } },
            { 'address.state': { $regex: location, $options: 'i' } },
            { 'address.country': { $regex: location, $options: 'i' } },
            { 'address.zip': { $regex: location, $options: 'i' } },
        ];
    }
    if (price) {
        const [minPrice, maxPrice] = price.split('-');
        filters.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (type) {
        filters.type = type;
    }
    if (available) {
        filters.available = available;
    }
    if (inDate && outDate) {
        filters.bookings = {
            $not: {
                $elemMatch: {
                    checkin: { $lt: outDate },
                    checkout: { $gt: inDate },
                },
            },
        };
    }
    try {
        const hotels = await Hotel.find(filters);
        console.log(hotels);
        res.status(200).json({ hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json({ hotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// delete hotel
const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        await Hotel.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Hotel removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// update hotel
const updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const { name, description, thumbnail, photos, facilities, totalBookings, rating, minPrice, maxPrice, type, address } = req.body;

        if (name) hotel.name = name;
        if (description) hotel.description = description;
        if (thumbnail) hotel.thumbnail = thumbnail;
        if (photos) hotel.photos = photos;
        if (facilities) hotel.facilities = facilities;
        if (totalBookings) hotel.totalBookings = totalBookings;
        if (rating) hotel.rating = rating;
        if (minPrice) hotel.minPrice = minPrice;
        if (maxPrice) hotel.maxPrice = maxPrice;
        if (type) hotel.type = type;
        if (address) hotel.address = address;

        await hotel.save();

        res.status(200).json({ message: 'Hotel updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    deleteHotel,
    updateHotel
}