import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    <div>
      <div className="flex">
        <h1>MAIN MENU</h1>
        <Card className="innerCard">
          <div className="buttonsDiv">
            <Button
              style={{ marginBottom: "1rem" }}
              variant="contained"
              onClick={() => navigate("/room/create")}
            >
              Create
            </Button>
            <Button
              className="button1"
              style={{ marginBottom: "1rem" }}
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

          <div className="card">
            <CardContent>
              <h1>How to Play</h1>
              <h3>
                <ol>
                  <li>Create/Join Room</li>
                  <li>Start the game</li>
                  <li>Guess the movie</li>
                </ol>
              </h3>
              <h2>That's it! Have fun! :)</h2>
              
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MainMenu;
