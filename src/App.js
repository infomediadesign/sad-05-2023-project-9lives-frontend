import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import PostLogin from "./components/PostLogin";
import Join from "./components/Join";
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
        <Route path="/home" element={<PostLogin />} />
        <Route path="/join" element={<Join />} />
     
      </Routes>
    </div>
  );
};

export default App;

