import { useRef, useEffect, useContext } from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
function verifyEmail() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  axios.defaults.withCredentials = true; // Ensure cookies are sent with every request
  const { backendUrl, isLoggedIn, user, getUserData } = useContext(AppContent);
  const handleInput = (e, index) => { 
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('');
    pasteArray.forEach((char, index) => {
      if(inputRefs.current[index]){
        inputRefs.current[index].value = char;
      }
    }) 
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(el => el.value)
      const otp = otpArray.join('');

      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/verify-email`, { otp })
      if (data.success) {
        toast.success(data.message);
        getUserData(); // Refresh user data after verification
        navigate('/');
      } else {
        toast.error(data.message);
      } 
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedIn && user && user.isAccountVerified && navigate('/');
  }, [isLoggedIn, user]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <img onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute top-5 left-20 w-16 h-16 rounded-full object-cover shadow-md cursor-pointer"
      />
      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your adress email </p>
        <div onPaste={handlePaste} className='flex items-center justify-between mb-8 w-full space-x-1'>
          {Array(6).fill(0).map((_, index) => (
            <input 
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 text-white text-center text-xl font-semibold rounded-md shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150" type="text" maxLength='1' key={index} required />
          ))}
        </div>
        <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 cursor-pointer'>Verify email</button>
      </form>
    </div>
  )
}

export default verifyEmail