# Hotel Room Booking App

This is a full stack web application built using React, Node.js, Express, and MongoDB. It is a hotel room booking app where users can book a room in a hotel of their choice. Users can also add hotels to their wishlist and view their bookings and wishlist.

## Routes

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile
- POST /api/auth/addTowishlist
- POST /api/auth/removeFromWishlist
- POST /api/bookings
- GET /api/bookings
- DELETE /api/bookings/:id
- PUT /api/bookings/:id
- POST /api/hotels
- GET /api/hotels
- GET /api/hotels/:id
- DELETE /api/hotels/:id
- PUT /api/hotels/:id
- POST /api/rooms
- GET /api/rooms
- DELETE /api/rooms/:id
- PUT /api/rooms/:id

## Features

- User authentication
- User profile
- Add hotels to wishlist
- Book a room
- View bookings and wishlist

## Tech Stack

- React
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Bcrypt
- React Router

## Installation

Clone the repository

```bash
git clone
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

If your deploying server on `https://render.com/` then you have to change build cmd `yarn` to `yarn install --ignore-engines`

## Author

- [Saurav Hathi](https://github.com/sauravhathi)
