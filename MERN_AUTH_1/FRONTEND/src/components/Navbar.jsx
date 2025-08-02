
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
  const navigate = useNavigate();
  const { user, backendUrl, setUser, setIsLoggedIn} = useContext(AppContent);

  const sendVerificationOtp = async () => {
    try {
        axios.defaults.withCredentials = true;
        
        const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/send-otp-verify`)
        if (data.success) {
          navigate('/email-verify');
        } else {
          toast.error(data.message);
        }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true; // Ensure cookies are sent with the request
      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/logout`);
      data.success && setIsLoggedIn(false);
      data.success && setUser(null);
      navigate('/');
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    }
  }
  return (
    <header className="w-full h-20 px-8 md:px-16 flex items-center justify-between bg-white shadow-sm z-50">
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

      {user ? (
        <button
          className="flex items-center gap-2 border border-red-400 text-red-600 font-bold rounded-full px-4 py-2 hover:bg-red-100 transition-all duration-200 cursor-pointer bg-red-200 relative group"
        >
          {user.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-md pt-10">
            <ul className="bg-slate-50 shadow-lg rounded p-2 space-y-2 list-none m-0 text-sm min-w-max inline-block text-start border border-gray-300">
              {/* Don't display this element if the user is already verified */}
              { !user.isAccountVerified && <li onClick={sendVerificationOtp} className="py-1 px-3 hover:bg-gray-100 font-medium cursor-pointer">Verify Email</li>}
              
              <li onClick={handleLogout} className="py-1 px-3 hover:bg-gray-100 font-medium cursor-pointer">Logout</li>
            </ul>
          </div>
        </button>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-100 transition-all duration-200 cursor-pointer"
        >
          <span className="font-medium">Login</span>
          <AiOutlineArrowRight className="text-lg" />
        </button>
      )}
    </header>
  );
}

export default Navbar;