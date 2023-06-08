import React from "react";
import { Routes, Route } from "react-router-dom";
//================= Component imports ====================//
import Login from "./auth/Login";
import Register from "./auth/Register";
import PostLogin from "./PostLogin";
import Join from "./Join";
import Create from "./Create";
import Display from "./Display";

const HandleRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PostLogin />} />
      <Route path="/join" element={<Join />} />
      <Route path="/create" element={<Create />} />
      <Route path="/display" element={<Display />} />
    </Routes>
  );
};

export default HandleRoutes;
