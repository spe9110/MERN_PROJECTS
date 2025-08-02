import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

function Home() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <div
        className=""
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1735927030748-26623a3422ab?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      ></div>

      {/* Content on top of background */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <Header />
      </div>
    </div>
  );
}

export default Home;


/*
import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'


function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url(https://i.pinimg.com/1200x/a3/5f/ce/a35fce50d081f05675acdbba3c62bd0a.jpg)] bg-cover bg-center'>
        <Navbar />
        <Header />
    </div>
  )
}

export default Home

*/