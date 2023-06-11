import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import HandleRoutes from "./components/HandleRoutes";
import { useJwt } from "react-jwt";
import { useGlobalContext } from "./utils/Hooks/context";
import "./App.css";

const App = () => {
  const { auth, removeFromLocalStorage, setAuth } = useGlobalContext();
  const { isExpired } = useJwt(auth.token);
  useEffect(() => {
    if (isExpired) {
      removeFromLocalStorage();
      setAuth({ token: "" });
    }
  }, []);

  return (
    <div className="container">
      {/* <Header /> */}
      <HandleRoutes />
    </div>
  );
};

export default App;
