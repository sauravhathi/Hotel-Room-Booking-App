import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HotelDetails() {
  const { id } = useParams();

  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    fetch(`/api/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => setHotel(data.hotel));
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
        </div>
      )}
    </div>
  );
}

export default HotelDetails;