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
1. Resend OTP Timer Button (60 seconds cooldown)
✨ What it does:
Disables the "Resend OTP" button for 60 seconds after sending the email.

Prevents spamming the OTP endpoint.

Adds a timer countdown to inform the user.

✅ Steps to implement:
A. Add these new states:
const [resendCooldown, setResendCooldown] = useState(60);
const [canResend, setCanResend] = useState(false);
B. Add a useEffect to handle the countdown:

import { useEffect } from 'react';

useEffect(() => {
  let timer;
  if (isEmailSent && resendCooldown > 0) {
    timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
  } else if (resendCooldown === 0) {
    setCanResend(true);
  }

  return () => clearTimeout(timer);
}, [resendCooldown, isEmailSent]);

C. Add this function for resending the OTP:
const onResendOtp = async () => {
  try {
    const { data } = await axios.post(`${backendUrl}/api/v1/users/auth/send-reset-password`, { email });
    if (data.success) {
      toast.success('OTP resent successfully');
      setResendCooldown(60);
      setCanResend(false);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

D. Add this button below your OTP form:
<div className="text-center mt-4 text-indigo-300">
  Didn't receive the code?
  <button
    type="button"
    onClick={onResendOtp}
    disabled={!canResend}
    className={`ml-2 font-semibold ${
      canResend ? 'text-indigo-500 hover:underline' : 'text-gray-400 cursor-not-allowed'
    }`}
  >
    Resend OTP {canResend ? '' : `(${resendCooldown}s)`}
  </button>
</div>

*/