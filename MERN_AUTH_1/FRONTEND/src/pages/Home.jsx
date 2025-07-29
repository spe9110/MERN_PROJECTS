import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'


function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url(https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80)] bg-cover bg-center'>
        <Navbar />
        <Header />
    </div>
  )
}

export default Home