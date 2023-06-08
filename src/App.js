import React, { useState } from "react";
import HandleRoutes from "./components/HandleRoutes";
import "./App.css";
import Create from "./components/Create";
import Display from "./components/Display";


const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/create" element={<Create />} />
        <Route path="/display" element={<Display />} />
      </Routes>
      <HandleRoutes />
    </div>
  );
};

export default App;
