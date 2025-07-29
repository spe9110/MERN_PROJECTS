import React from 'react';
import { assets } from '../assets/assets';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    
    const handleLoginClick = () => {
        navigate('/login');
    };

  return (
    <header className="w-full h-20 px-8 md:px-16 flex items-center justify-between bg-white shadow-sm z-50">
      {/* Logo & Title */}
      <div className="flex items-center space-x-4">
        <img
          src={assets.logo}
          alt="logo"
          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover shadow-md"
        />
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
          Cabinet Wawaku
        </h1>
      </div>

      {/* Login Button */}
      <button onClick={handleLoginClick} className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 transition-all duration-200 cursor-pointer">
        <span className="font-medium">Login</span>
        <AiOutlineArrowRight className="text-lg" />
      </button>
    </header>
  );
}

export default Navbar;