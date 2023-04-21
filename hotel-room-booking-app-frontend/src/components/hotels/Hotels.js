import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsSearch } from "react-icons/bs";
import { AiFillHeart, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { AppContext } from './AppContext';

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])
    return debouncedValue
}

const Hotels = () => {

    const navigate = useNavigate();
    const { isWhishlist, setIsWhishlist } = React.useContext(AppContext);
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState('');
    const [whishlist, setWhishlist] = React.useState([]);
    const [location, setLocation] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [type, setType] = React.useState('');
    const [available, setAvailable] = React.useState(false);
    const [inDate, setInDate] = React.useState('');
    const [outDate, setOutDate] = React.useState('');
    const debouncedQuery = useDebounce(query, 250);

    const LocationOptions = ['Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Goa', 'Kochi', 'Chandigarh', 'Agra', 'Vizag', 'Nagpur', 'Indore', 'Patna', 'Bhopal', 'Vadodara', 'Ghaziabad', 'Coimbatore', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot'];
    const TypeOptions = ['Classic', 'Club', 'Deluxe', 'Suite', 'Presidential', 'Luxury', 'Superior', 'Standard'];
    const PriceOptions = [
        { min: 5000, max: 10000 },
        { min: 10000, max: 15000 },
        { min: 15000, max: 20000 },
        { min: 20000, max: 25000 },
        { min: 25000, max: 30000 },
        { min: 30000, max: 35000 },
        { min: 35000, max: 40000 },
        { min: 40000, max: 45000 },
        { min: 45000, max: 50000 },
    ]

    const [hotels, setHotels] = React.useState([]);

    const fetchHotels = async () => {
        try {
            const params = {};
            if (query) params.query = query;
            if (location) params.location = location;
            if (price) params.price = price;
            if (type) params.type = type;
            if (available) params.available = available;
            if (inDate) params.inDate = inDate;
            if (outDate) params.outDate = outDate;
            setLoading(true);
            const res = await axios.get('/api/hotels', { params });
            setHotels(res.data.hotels);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    let isUseEffectCalled = false;
    useEffect(() => {
        if (!isUseEffectCalled) {
            isUseEffectCalled = true;
            fetchHotels();
            fetchUser();
        }
    }, [debouncedQuery, location, price, type, available, inDate, outDate]);

    const fetchUser = async () => {
        try {
            if (localStorage.getItem('token') === null) return;

            const res = await axios.get('/api/auth/profile', {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            setUser(res.data);
            setWhishlist(res.data.whishlist);
            setIsWhishlist(res.data.whishlist);
        } catch (err) {
            console.log(err);
        }
    }

    const addTowishlist = async (hotel) => {
        try {
            if (localStorage.getItem('token') === null) {
                alert('Please login to add to wishlist');
                return;
            }
            const res = await axios.post('/api/auth/addTowishlist', { hotel }, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            fetchUser();
        } catch (err) {
            console.log(err);
        }
    }

    const removeFromWishlist = async (hotel) => {
        try {
            const res = await axios.post('/api/auth/removeFromWishlist', { hotel }, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            });
            fetchUser();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col items-center gap-4'>
                <div className='max-w-2xl w-full bg-white rounded-lg shadow-lg p-4'>
                    <div className='flex items-center'>
                        <BsSearch className='h-5 w-5 text-gray-400' />
                        <input type='text' className='w-full ml-2 focus:outline-none' placeholder='Search hotels, streets, cities, states, countries, zip codes'
                            value={query} onChange={e => setQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && console.log('Enter pressed')} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1'>Location</label>
                            <select className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500' value={location} onChange={e => setLocation(e.target.value)}>
                                <option value=''>All</option>
                                {LocationOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1'>Price</label>
                            <select className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500' value={price} onChange={e => setPrice(e.target.value)}>
                                <option value=''>All</option>
                                {PriceOptions.map(option => (
                                    <option key={option.min} value={`${option.min}-${option.max}`}>{option.min} - {option.max}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1'>Type</label>
                            <select className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500' value={type} onChange={e => setType(e.target.value)}>
                                <option value=''>All</option>
                                {TypeOptions.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1'>Check In</label>
                            <input type='date' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500' value={inDate} onChange={e => setInDate(e.target.value)} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-sm font-semibold text-gray-600 mb-1'>Check Out</label>
                            <input type='date' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500' value={outDate} onChange={e => setOutDate(e.target.value)} />
                        </div>
                    </div>
                </div>
                {!loading ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {hotels.map((hotel, index) => (
                            <div key={index} className='transition duration-500 ease-in-out transform hover:-translate-y-2 bg-white rounded-lg shadow-lg overflow-hidden'>
                                <div className='relative'>
                                    <img src={hotel.thumbnail} alt={hotel.name} className='h-48 w-full object-cover' />
                                    {hotel.totalBookings > 1000 ? (
                                        <div className='absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-semibold uppercase'>Popular</div>
                                    ) : hotel.totalBookings > 500 ? (
                                        <div className='absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-semibold uppercase'>Best Seller</div>
                                    ) : null}
                                    <div className='absolute top-0 right-0 m-4'>
                                        {
                                            whishlist.includes(hotel._id) ? (
                                                <AiFillHeart className='h-6 w-6 text-red-500 cursor-pointer' onClick={() => removeFromWishlist(hotel._id)} />
                                            ) : (
                                                <AiOutlineHeart className='h-6 w-6 text-red-500 cursor-pointer' onClick={() => addTowishlist(hotel._id)} />
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='p-4'>
                                    <h1 className='text-lg font-semibold text-gray-700'>{hotel.name}</h1>
                                    <div className='flex items-center mt-2'>
                                        {[...Array(Math.round(hotel.rating))].map((_, index) => (
                                            <AiFillStar key={index} className='h-4 w-4 text-yellow-400' />
                                        ))}
                                        {[...Array(5 - Math.round(hotel.rating))].map((_, index) => (
                                            <AiFillStar key={index} className='h-4 w-4 text-gray-400' />
                                        ))}
                                        <span className='text-sm font-semibold text-gray-500 ml-2'>{hotel.rating}</span>
                                    </div>
                                    <div className='flex items-center mt-2'>
                                        <span className='text-sm font-semibold text-gray-500'>{hotel.type}</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between px-4 py-2 bg-gray-100'>
                                    <div className='flex items-center'>
                                        <span className='text-sm font-semibold text-gray-500'>From</span>
                                        <span className='text-lg font-semibold text-gray-700 ml-2'>
                                            ₹{hotel.minPrice} ~ ₹{hotel.maxPrice}
                                        </span>
                                    </div>
                                    <button
                                        className='bg-indigo-500 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-indigo-600 tracking-widest'
                                        onClick={() => navigate(`/hotels/${hotel._id}`)}
                                    >
                                        Deal
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex items-center justify-center'>
                        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
                    </div>

                )}
                </div>
        </div>
    );
};

export default Hotels;

