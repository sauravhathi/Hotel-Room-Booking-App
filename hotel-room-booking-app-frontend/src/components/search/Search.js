import React, { useState } from 'react';

const Search = () => {
    const [city, setCity] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    
    return (
        <div>
        <h1>Search</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="city">City</label>
            <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="checkIn">Check In</label>
            <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="checkOut">Check Out</label>
            <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="guests">Guests</label>
            <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
            />
            </div>
            <button type="submit">Search</button>
        </form>
        </div>
    );
    }

export default Search;
