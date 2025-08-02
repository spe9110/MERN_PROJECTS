import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import VerifyEmail from './pages/verifyEmail'
import Login from './pages/login'
import ResetPassword from './pages/resetPassword'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          theme="colored"
        />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<VerifyEmail/>} />
        <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App


// npm create vite@latest
// npm i react-router-dom@ react-icons
// npm i axios
// npm i react-toastify
// npm install tailwindcss @tailwindcss/vite