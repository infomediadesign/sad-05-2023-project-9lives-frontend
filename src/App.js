import Header from "./components/Header/Header";
import Playground from "./components/Playground/Playground";
import React from "react";
import HandleRoutes from "./components/HandleRoutes";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/playground" element={<Playground />} />
      </Routes>
      <HandleRoutes />
    </div>
  );
};

export default App;
