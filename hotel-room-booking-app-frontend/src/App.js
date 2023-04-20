import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hotels from './components/hotels/Hotels';
import HotelDetails from './components/hotels/[id]';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Header from './components/header.js/Header';
import { AppContext } from './components/hotels/AppContext';

function App() {
  const [isWhishlist, setIsWhishlist] = React.useState([]);
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <AppContext.Provider value={{ isWhishlist, setIsWhishlist }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<><Header /><Hotels /></>} />
            <Route path='/hotels/:id' element={<><Header /><HotelDetails /></>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;