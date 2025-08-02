import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState('login'); // Default to login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      let response;

      if (state === 'signup') {
        response = await axios.post(`${backendUrl}/api/v1/users/auth/create`, {
          name,
          email,
          password,
        });
        console.log("Signup response:", response);

        if (response?.data?.success) {
          toast.success("Account created successfully!");
          await getUserData();
          setIsLoggedIn(true);
        } else {
          toast.error(response?.data?.message || 'Signup failed!');
          return;
        }
      } else {
        response = await axios.post(`${backendUrl}/api/v1/users/auth/login`, {
          email,
          password,
        });
        console.log("Login response:", response);

        if (response?.data?.success) {
          toast.success("Login successful!");
          await getUserData();
          setIsLoggedIn(true);
        } else {
          toast.error(response?.data?.message || "Login failed");
          return;
        }
      }

      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (error) {
      console.error("Login/signup error:", error);
      const message = error?.response?.data?.message || error.message || 'Something went wrong';
      toast.error(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="logo"
            className="absolute top-5 left-20 w-16 h-16 rounded-full object-cover shadow-md cursor-pointer"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            {state === 'signup' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-600">
            {state === 'signup' ? 'Create your account' : 'Login to your account!'}
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="space-y-4">
            {state === 'signup' && (
              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
                <FaUser className="text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                placeholder="Email Address"
                required
              />
            </div>
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100 relative">
              <FaLock className="text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                placeholder="Password"
                required
              />
              <div
                className="absolute right-5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
            Forget Password?
          </p>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition hover:opacity-90"
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {state === 'signup' ? (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('login')} className='text-blue-400 cursor-pointer underline'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('signup')} className='text-blue-400 cursor-pointer underline'>
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;


/*
import { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContent);

  const [state, setState] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
const onSubmitHandler = async (e) => {
  e.preventDefault();
  axios.defaults.withCredentials = true;

  try {
    let response;

    if (state === 'signup') {
      response = await axios.post(`${backendUrl}/api/v1/users/auth/create`, {
        name,
        email,
        password,
      });
      console.log("Signup response:", response);

      if (response?.data?.success) {
        toast.success("Account created successfully!");
        await getUserData();
        setIsLoggedIn(true);
      } else {
        toast.error(response?.data?.message || 'Signup failed!');
        return;
      }
    } else {
      response = await axios.post(`${backendUrl}/api/v1/users/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", response);

      if (response?.data?.success) {
        toast.success("Login successful!");
        await getUserData();
        setIsLoggedIn(true);
      } else {
        toast.error(response?.data?.message || "Login failed");
        return;
      }
    }


    // Navigate to homepage
    setTimeout(() => {
      navigate('/');
    }, 1000);

  } catch (error) {
    console.error("Login/signup error:", error);
    const message = error?.response?.data?.message || error.message || 'Something went wrong';
    toast.error(message);
  }
};



  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="logo"
            className="absolute top-5 left-20 w-16 h-16 rounded-full object-cover shadow-md cursor-pointer"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            {state === 'signup' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-600">
            {state === 'signup' ? 'Create your account' : 'Login to your account!'}
          </p>
        </div>
        <form onSubmit={onSubmitHandler}>
          {state === 'signup' && (
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                placeholder="Full Name"
                required
              />
            </div>
          )}
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Password"
              required
            />
          </div>
          <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>
            Forget Password?
          </p>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition hover:opacity-90"
          >
            {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {state === 'signup' ? (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('login')} className='text-blue-400 cursor-pointer underline'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('signup')} className='text-blue-400 cursor-pointer underline'>
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
*/