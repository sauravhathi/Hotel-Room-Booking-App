# Hotel Room Booking App

This is a full stack web application built using React, Node.js, Express, and MongoDB. It is a hotel room booking app where users can book a room in a hotel of their choice. Users can also add hotels to their wishlist and view their bookings and wishlist.

## Screenshots
![image](https://user-images.githubusercontent.com/53424917/233553747-8c6eab14-e6df-47fe-a231-4e4ce290af37.png)

![image](https://user-images.githubusercontent.com/53424917/233553823-a3442389-a0f0-4aee-bf7a-3307f9d4591d.png)
### Whishlist
![image](https://user-images.githubusercontent.com/53424917/233553867-e421314a-e4ac-461f-bd21-9c5e787ca5db.png)

### Search
![image](https://user-images.githubusercontent.com/53424917/233553962-aca8170b-9d91-4823-aa93-33e32c2aaaea.png)

### Filter
![image](https://user-images.githubusercontent.com/53424917/233553998-fe5d9d60-cafd-485a-acb6-a4ce93c26dfb.png)

![image](https://user-images.githubusercontent.com/53424917/233553528-6341613a-2296-49fc-bad0-4c1d04d69daa.png)

## Routes

Example: `http://localhost:5000/api/hotels`
```json
{
  "name": "The Oberoi",
  "description": "A five-star hotel in Bengaluru that offers spacious rooms, lush gardens and a range of dining options.",
  "thumbnail": "https://p.bookcdn.com/data/Photos/Big/2802/280227/280227909/The-Oberoi-Bengaluru-photos-Exterior-Exterior-View.JPEG",
  "photos": [
    "https://i.travelapi.com/hotels/1000000/30000/21700/21672/091e0da7_z.jpg",
    "https://i.travelapi.com/lodging/1000000/30000/21700/21672/e66fb5e5_z.jpg",
    "http://www.cfmedia.vfmleonardo.com/imageRepo/6/0/102/968/196/TOBL_Business_Centre_board_room_1_P.jpg",
    "https://q-xx.bstatic.com/xdata/images/hotel/840x460/47332041.jpg?k=57b8804a2c78b7c0d606a6296307f81887bc85dd6ad2c46ae3ce99b6b026e9c6&o=",
    "https://q-xx.bstatic.com/xdata/images/hotel/max1280x900/47333165.jpg?k=db4d3a70602042f50cd96765f627bdc1c6c9d8bbb0d9ae350027bd650afb4f99&o=",
    "https://i.travelapi.com/lodging/1000000/30000/21700/21672/51d47acc_z.jpg",
    "http://www.cfmedia.vfmleonardo.com/imageRepo/6/0/102/968/450/TOBL_The_Lobby_new_big_P.jpg"
  ],
  "facilities": [
    "Free Wi-Fi",
    "Swimming pool",
    "Spa",
    "Restaurant",
    "Bar",
    "Gym",
    "Parking"
  ],
  "totalBookings": 89,
  "rating": 4.7,
  "minPrice": 9000,
  "maxPrice": 20000,
  "type": "Luxury",
  "address": {
    "street": "37-39, Mahatma Gandhi Road",
    "city": "Bengaluru",
    "state": "Karnataka",
    "country": "India",
    "zip": "560001"
  }
}
```

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
