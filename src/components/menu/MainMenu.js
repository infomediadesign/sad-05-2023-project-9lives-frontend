import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "./MainMenu.css";
import { useGlobalContext } from "../../utils/Hooks/context";

const MainMenu = () => {
  const navigate = useNavigate();
  const { setAuth, removeFromLocalStorage } = useGlobalContext();

  const handleLogout = () => {
    // console.log("logout ho gaya bc tu");
    removeFromLocalStorage();
    setAuth({ token: "" });
    navigate("/login");
  };

  return (
    <Card className="menu">
      <h1>MAIN MENU</h1>
      <div className="menu-action">
        <div className="buttonsDiv">
          <Button
            variant="contained"
            onClick={() => navigate("/room/create")}
          >
            Create
          </Button>
          <Button
            onClick={() => navigate("/join")}
            variant="contained"
          >
            Join
          </Button>
          <Button
            className="logout"
            variant="contained"
            onClick={handleLogout}
            style={{ backgroundColor: "rgb(218, 73, 73)" }}
          >
            Logout
          </Button>
        </div>

        <div className="instructions">
          <h1>How to Play</h1>
          <h3>
            <ol>
              <li>Create/Join Room</li>
              <li>Start the game</li>
              <li>Guess the movie</li>
            </ol>
          </h3>
          <h2>That's it! Have fun! :)</h2>
        </div>
      </div>
    </Card>
  );
};

export default MainMenu;
