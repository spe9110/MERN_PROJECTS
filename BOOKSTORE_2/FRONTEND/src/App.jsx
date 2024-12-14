import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CreateBooks from './Pages/CreateBooks';
import DeleteBook from './Pages/DeleteBook';
import EditBook from './Pages/EditBook';
import ShowBook from './Pages/ShowBook';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/books/create' element={<CreateBooks/>} />
      <Route path='/books/details/:id' element={<ShowBook/>} />
      <Route path='/books/edit/:id' element={<EditBook/>} />
      <Route path='/books/delete/:id' element={<DeleteBook/>} />
    </Routes>
  )
}

export default App;
