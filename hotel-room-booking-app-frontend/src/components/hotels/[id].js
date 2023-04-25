import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState(null);
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api';

  const getRooms = async () => {
    try {
      const res = await fetch(apiEndpoint + `/rooms/rooms/${id}`);
      const data = await res.json();
      setRooms(data.rooms);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(apiEndpoint + `/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data.hotel));
    getRooms();
  }, [id]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <h1 className="text-3xl font-bold text-gray-900">Hotel Details</h1>
      </div>
      {hotel && (
        <div className="py-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img
                src={hotel.thumbnail}
                alt={hotel.name}
                className="w-full rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
              <p className="text-gray-600">{hotel.description}</p>
              <div className="flex flex-col md:flex-row mt-4">
                <div className="w-full md:w-1/2">
                  <h1 className="text-xl font-bold text-gray-900">
                    {hotel.rating}
                  </h1>
                  <p className="text-gray-600">Rating</p>
                </div>
                <div className="w-full md:w-1/2">
                  <h1 className="text-xl font-bold text-gray-900">
                    {hotel.totalBookings}
                  </h1>
                  <p className="text-gray-600">Total Bookings</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-full">
                  <h1 className="text-xl font-bold text-gray-900 mt-4">
                    Facilities
                  </h1>
                </div>
                <div className="flex flex-wrap">
                  {hotel.facilities.map((facility) => (
                    <div
                      key={facility}
                      className="shadow-md rounded-lg px-4 py-1 tracking-wide transition duration-500 ease-in-out transform hover:-translate-y-1 bg-gray-100 text-gray-600 mr-2 mt-2"
                    >
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">
              Photos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {hotel.photos.map((photo, index) => (
                <img
                  src={photo}
                  alt={hotel.name}
                  className="w-full h-64 object-fill rounded-md"
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">
              Rooms
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {
                rooms && rooms.length > 0 ? (
                  rooms.map((room, index) => (
                    <div
                      key={index}
                      className={`shadow-md rounded-lg px-4 py-1 tracking-wide transition duration-500 ease-in-out transform hover:-translate-y-1 bg-gray-100 text-gray-600 mr-2 mt-2 ${room.available ? 'bg-green-100' : 'bg-red-100'
                        }`}
                    >
                      <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-gray-900">
                          {room.roomNumber}
                        </h1>
                        <p className={`text-gray-600 w-fit px-1 rounded-sm ${room.available ? 'text-white bg-green-500' : 'text-white bg-red-500'}
                          `}>
                          {room.available ? "Available"
                            :
                            "Booked"
                          }
                        </p>
                        <p className="text-gray-600">{room.type}</p>
                        <p className="text-gray-600">{room.price}</p>
                        <p className="text-gray-600">{room.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="shadow-md rounded-lg px-4 py-1 tracking-wide transition duration-500 ease-in-out transform hover:-translate-y-1 bg-gray-100 text-gray-600 mr-2 mt-2">
                    <div className="flex flex-col">
                      <h1 className="text-xl font-bold text-gray-900">
                        Room not available
                      </h1>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelDetails;