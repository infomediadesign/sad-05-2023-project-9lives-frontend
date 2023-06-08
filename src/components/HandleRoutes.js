import React from "react";
import { Routes, Route } from "react-router-dom";
//================= Component imports ====================//
import Login from "./auth/Login";
import Register from "./auth/Register";
import MainMenu from "./menu/MainMenu";
import Join from "./room/Join/Join";
import Create from "./room/Create/Create";
// import Display from "./Display/Display";
import Playground from "./room/Playground/Playground";

const HandleRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<MainMenu />} />
      <Route path="/join" element={<Join />} />
      <Route path="/create" element={<Create />} />
      {/* <Route path="/display" element={<Display />} /> */}
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
};

export default HandleRoutes;
