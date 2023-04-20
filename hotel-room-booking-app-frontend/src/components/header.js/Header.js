import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import React, { useContext } from 'react';
import { AppContext } from '../hotels/AppContext';

const Header = () => {
    const { isWhishlist, setIsWhishlist } = useContext(AppContext);
    console.log('isWhishlist', isWhishlist);

    const logout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className='sticky z-50 top-0 bg-white flex justify-between items-center py-4 px-4'>
            <h1 className='text-2xl md:text-3xl font-bold'>
                <Link to='/'>Hotel Booking</Link>
            </h1>
            <div className='flex items-center'>
                <Link to='/' className='flex items-center text-gray-600 hover:text-red-500 mr-4'>
                    {
                        isWhishlist.length === 0 ? (
                            <AiOutlineHeart className='h-5 w-5 mr-2 text-red-500' />
                        ) : (
                            <AiFillHeart className='h-5 w-5 mr-2 text-red-500' />
                        )
                    }
                    Whishlist<sup className='w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center'>{isWhishlist.length}</sup>
                </Link>
                <Link to='/login' onClick={logout} className='flex items-center text-gray-600 hover:text-red-500'>
                    <RiLogoutCircleRLine className='h-5 w-5 mr-2' />
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Header