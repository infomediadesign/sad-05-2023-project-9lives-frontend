import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
// import { Switch } from '@mui/material';

const App = () => {
  // const [isRegistered, setIsRegistered] = useState(false);

  // const handleRegister = () => {
  //   setIsRegistered(true);
  // };

  return (
    <div className="container">
      {/* {isRegistered ? (
        <Login />
      ) : (
        <Register onRegister={handleRegister} />
      )} */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
