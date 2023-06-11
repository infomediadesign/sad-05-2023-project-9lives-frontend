import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import React from "react";
import Header from "./components/Header/Header";
import HandleRoutes from "./components/HandleRoutes";
import "./App.css";

const App = () => {
  
  return (
    <div className="container">
      {/* <Header /> */}
      <HandleRoutes />
    </div>
  );
};

export default App;
