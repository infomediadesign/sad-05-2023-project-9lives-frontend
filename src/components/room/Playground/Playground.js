import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../utils/Hooks/context";
// import io from "socket.io-client";
// import { __BASE_URL__ } from "../../../utils/constants";

// const socket = io(__BASE_URL__ + "/game");

const Playground = () => {
  const { roomID } = useParams();
  const { auth, socket } = useGlobalContext();
  const [gameState, setGameState] = useState(null);
  const [guess, setGuess] = useState("");

  useEffect(() => {
    // Listen for game state updates
    socket.on("gameState", (gameState) => {
      setGameState(gameState);
    });

    // Listen for game over event
    socket.on("gameOver", () => {
      // Handle game over logic (e.g., displaying results, resetting the game, etc.)
      console.log("Game over!");
    });

    // Clean up event listeners on component unmount
    return () => {
      socket.off("gameState");
      socket.off("gameOver");
    };
  }, [roomID]);

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess && gameState) {
      socket.emit("guess", guess);
      setGuess("");
    }
  };

  if (!gameState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Neko Nine Lives</h1>
      {/* <p>Attempts Left: {gameState.attemptsLeft}</p>
      <p>Guessed Letters: {Array.from(gameState.guessedLetters).join(", ")}</p>
      <form onSubmit={handleGuess}>
        <label>
          Guess:
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Playground;
