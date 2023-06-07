import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import PostLogin from "./components/PostLogin";
import Join from "./components/Join";
import Create from "./components/Create";
import Display from "./components/Display";
// import ScratchProject from "./components/ScratchProject"; 
// import { Switch } from '@mui/material';
import Header from "./components/Header";
// import Figure from "./components/Figure";
import Playground from "./components/Playground";
// import Wrongletters from "./components/Wrongletters";
// import Word from "./components/Word";


  // const [isRegistered, setIsRegistered] = useState(false);

  // const handleRegister = () => {
  //   setIsRegistered(true);
  // };


  




  function App() {

  return (
    <div>
               <>
<Header/>

</>

    
    <div className="container">

      {/* {isRegistered ? (
        <Login />
      ) : (
        <Register onRegister={handleRegister} />
      )} */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PostLogin />} />
        <Route path="/join" element={<Join />} />
        <Route path="/playground" element={<Playground />} />
      
        <Route path="/create" element={<Create />} />
        <Route path="/display" element={<Display />} />
     
      </Routes>
   
    </div>    </div>
  );
};

export default App;

