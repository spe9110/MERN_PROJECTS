import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const [state, setState] = useState('signup'); // 'signup' or 'login'

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img
            src={assets.logo}
            alt="logo"
            className="w-16 h-16 rounded-full object-cover shadow-md"
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
        <form className="space-y-4">
          {state === 'signup' && (
            <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
              <FaUser className="text-gray-500" />
              <input
                type="text"
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
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Password"
              required
            />
          </div>
          <p className='mb-4 text-indigo-500 cursor-pointer'>Forget Password?</p>
          <button type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition hover:opacity-90">
              {state === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        {state === 'signup' ? (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Already have an account?{' '}
            <span onClick={() => setState('login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='text-gray-400 text-center text-sm mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('signup')} className='text-blue-400 cursor-pointer underline'>Sign up</span>
          </p>
        )} 
      </div>
    </div>
  );
}

export default Login;

/*
import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
  const [state, setState] = useState('Sign up'); // 'sign-up' or 'login'

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 py-[100px]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <img
            src={assets.logo}
            alt="logo"
            className="w-16 h-16 rounded-full object-cover shadow-md"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">
            {state === 'sign-up' ? 'Create Account' : 'Login'}
          </h2>
          <p className="text-sm text-gray-600">
            {state === 'sign-up' ? 'Create your account' : 'Login to your account!'}
          </p>
        </div>
        <form className="space-y-4">
            {state === 'sign-up' && (
                <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Full Name"
              required
            />
            </div> )}
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Email Address"
              required
            />
          </div>
          <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              placeholder="Password"
              required
            />
          </div>
          <p className='mb-4 text-indigo-500 cursor-pointer'>Forget Password?</p>
          <button type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium transition hover:opacity-90">{state}</button>
        </form>
        {state === 'Sign up' ? (
            <p className='text-gray-400 text-center text-sm mt-4'>
                Already have an account?{' '}
                <span onClick={() => setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
            </p>
        ) : (
        <p className='text-gray-400 text-center text-sm mt-4'>
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign up</span>
        </p>
        )} 
      </div>
    </div>
  );
}

export default Login;
*/