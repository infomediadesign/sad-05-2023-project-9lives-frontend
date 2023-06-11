import React, { useState } from "react";
import "./Lobby.css"; // Import the CSS file
import { useLocation } from "react-router-dom";

const Lobby = ({
  // numPlayers,
  playerNames,
  // numRounds,
  // isCreator
  // numWordChoices
}) => {
  const [isCreator, setIsCreator] = useState(true);
  const { state } = useLocation();
  const { numPlayers, numRounds } = state
  const handleExit = () => {
    if (isCreator) {
      console.log("Room Deleted");
    }
    else {
      console.log("User exited the room");
    }
  };
  return (
    <form className="lobby-form">
      <div className="form-section">
        <h1> LOBBY </h1>
        <h2 className="lobby-heading">Game Settings</h2>
        <p className="lobby-info">Number of Rounds: {numRounds}</p>
        {/* <p className="lobby-info">Number of Word Choices: {numWordChoices}</p> */}
      </div>
      <div className="vertical-line"></div>
      <div className="form-section">
        <p className="lobby-info">Number of Players: {numPlayers}</p>
        <p className="lobby-info">Player Names:</p>
        <div className="buttons-container">
          <button className="start-button">Start</button>
          <button className="exit-button" onClick={handleExit}>Exit</button>
        </div>
      </div>
    </form>
  );
};

export default Lobby;