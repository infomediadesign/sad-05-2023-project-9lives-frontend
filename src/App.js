import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="container">
      {isRegistered ? (
        <Login />
      ) : (
        <Register onRegister={handleRegister} />
      )}
    </div>
  );
};

export default App;
