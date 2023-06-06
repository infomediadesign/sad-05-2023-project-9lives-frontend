import React, { useState } from "react";
import HandleRoutes from "./components/HandleRoutes";
import "./App.css";

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
      <HandleRoutes />
    </div>
  );
};

export default App;
