import React from "react";
import "./Lobby.css"; // Import the CSS file


const Lobby = ({ 
    numPlayers, 
    playerNames, 
    numRounds, 
    numWordChoices }) => {
    return (
      <div className="lobby-card">
        <div className="lobby-content">
          <h2 className="lobby-heading">Game Settings</h2>
          <p className="lobby-info">Number of Players: {numPlayers}</p>
          <p className="lobby-info">Player Names:</p>
          {/* <ul className="lobby-player-names">
            {playerNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul> */}
          <p className="lobby-info">Number of Rounds: {numRounds}</p>
          <p className="lobby-info">Number of Word Choices: {numWordChoices}</p>
        </div>
      </div>
    );
  };
  
  export default Lobby;
  
  
