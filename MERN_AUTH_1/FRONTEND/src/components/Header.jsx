import {useContext} from 'react'
import { AppContent } from '../context/AppContext'
function Header() {
  const { user} = useContext(AppContent);
  return (
    <section className="w-full h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="text-center px-6 max-w-4xl">
        <h1 className="text-lg md:text-xl font-bold text-gray-200 leading-tight">
          {user ? `Welcome, ${user.name}` : 'Welcome to Our Application'}
        </h1>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Build Beautiful Products with Confidence
        </h1>
        <p className="mt-6 mb-6 text-lg md:text-xl text-white">
          A modern React boilerplate for fast, scalable, and reliable web applications.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-pink-200 transition-all duration-200 cursor-pointer bg-white">
            Get Started
          </button>
          <button className="flex items-center gap-2 border border-gray-400 text-gray-700 rounded-full px-4 py-2 hover:bg-pink-200 transition-all duration-200 cursor-pointer bg-white">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default Header