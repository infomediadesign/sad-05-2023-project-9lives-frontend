import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const setInLocalStorage = (data) => {
  localStorage.setItem("loggedInUser", JSON.stringify(data));
};

const removeFromLocalStorage = () => {
  localStorage.removeItem("loggedInUser");
};

const AppProvider = (props) => {
  const [auth, setAuth] = useState({
    token: JSON.parse(localStorage.getItem("loggedInUser"))?.accessToken ?? "",
    id: JSON.parse(localStorage.getItem("loggedInUser"))?._id ?? "",
    email: JSON.parse(localStorage.getItem("loggedInUser"))?.email ?? "",
  });

  const [roomDetails, setRoomDetails] = useState({
    players: [],
    setting: { maxPlayers: null, rounds: null },
  });

  const [socket, setSocket] = useState(null);

  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        setInLocalStorage,
        removeFromLocalStorage,
        roomDetails,
        setRoomDetails,
        socket,
        setSocket,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
