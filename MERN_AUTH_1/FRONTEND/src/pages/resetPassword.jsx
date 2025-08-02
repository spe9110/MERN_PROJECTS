import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaEnvelope, FaKey, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const ResetPassword =() => {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputRefs = useRef([]);

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
    const paste = e.clipboardData.getData('text').slice(0, 6);
    paste.split('').forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/send-reset-password`, { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((input) => input.value).join('');
    if (otpValue.length === 6) {
      setOtp(otpValue);
      setIsOtpSubmitted(true);
    } else {
      toast.error('Please enter a 6-digit OTP');
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/reset-password`, { email, otp, newPassword });
      if (data.success) {
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute top-5 left-20 w-16 h-16 rounded-full object-cover shadow-md cursor-pointer"
      />

      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter your registered email address</p>
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-700">
            <FaEnvelope className="text-gray-100" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-100"
              placeholder="Email Address"
              required
            />
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-200 mt-4 cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {!isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitOtp} className="bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">Reset password OTP</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the 6-digit code sent to your email address</p>
          <div onPaste={handlePaste} className="flex items-center justify-between mb-8 w-full space-x-1">
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-800 text-white text-center text-xl font-semibold rounded-md shadow-inner border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-150"
                type="text"
                maxLength="1"
                required
              />
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form onSubmit={onSubmitNewPassword} className="bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">New password</h1>
          <p className="text-center mb-6 text-indigo-300">Enter the new password below</p>
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-700 relative">
  <FaLock className="text-gray-100" />
  <input
    type={showPassword ? 'text' : 'password'}
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="flex-1 bg-transparent outline-none text-sm text-gray-100 pr-8"
    placeholder="New Password"
    required
  />
  <div
    className="absolute right-4 cursor-pointer text-gray-300 hover:text-white"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </div>
          </div>
          <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-200 mt-4 cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;


/*
import { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { FaEnvelope } from 'react-icons/fa';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
function resetPassword() {
  const {backendUrl} = useContext(AppContent);

  axios.defaults.withCredentials = true; // Ensure cookies are sent with every request
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  
  const inputRefs = useRef([]);
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {

      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/send-reset-password`, { email });
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value);
    setOtp(otpArray.join(''));
    setIsOtpSubmitted(true);
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/reset-password`, { email, otp, newPassword });
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <img onClick={() => navigate('/')}
        src={assets.logo}
        alt="logo"
        className="absolute top-5 left-20 w-16 h-16 rounded-full object-cover shadow-md cursor-pointer"
      />

      {!isEmailSent &&  
      <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter your registered email adress</p>
        <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-700">
          <FaEnvelope className="text-gray-100" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-100"
            placeholder="Email Address"
            required
          />
        </div>
        <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-200 mt-4 cursor-pointer'>Submit</button>
      </form>
      }
      //  otp input form *
      {!isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitOtp} className='bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
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
        <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200 cursor-pointer'>Submit</button>
      </form>
      }

      //  enter new password 
      {isOtpSubmitted && isEmailSent && 
      <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-[450px] text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New password</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
        <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-700">
          <FaEnvelope className="text-gray-100" />
          <input
            type="email"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-100"
            placeholder="Password"
            required
          />
        </div>
        <button className='w-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white py-2 rounded-full hover:bg-indigo-700 transition duration-200 mt-4 cursor-pointer'>Submit</button>
      </form>
      }
    </div>
  )
}

export default resetPassword
*/