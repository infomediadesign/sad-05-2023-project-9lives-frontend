import React, { useState, useEffect } from "react";
import Wrongletters from "./Word/Wrongletters/Wrongletters";
import Word from "./Word/Word";
import Notification from "../../../helpers/Notification/Notification";
import Popup from "../../../helpers/Popup/Popup";
import Hearts from "./Heart";
import axios from "axios";
import "./Playground.css";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../../utils/Hooks/context";
import io from "socket.io-client";
import { __BASE_URL__, __GAME_DATA_URI__ } from "../../../utils/constants";

// const words = ["fanna", "ramleela", "vikramvedha", "singam", "raazi"]; // to be fetched from db

const Playground = (props) => {
  const socket = io(__BASE_URL__ + "/game");
  const { roomID } = useParams();
  const { auth, roomDetails, setRoomDetails } = useGlobalContext();

  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState(60);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [lives, setLives] = useState(9);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedWord, setSelectedWord] = useState(props.movie);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    axios
      .get(__GAME_DATA_URI__ + "/" + roomID, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        // setRoomDetails(res.data.roomDetails);
        // setGameState(res.data.roomDetails);
        socket.emit("dash", roomID);
      })
      .catch((err) => console.log(err.message));
    // Listen for game state updates
    socket.on("start", (movie) => {
      console.log(movie)
      setSelectedWord(movie);
    });
  }, []);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            setShowNotification(true);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((wrongLetters) => [...wrongLetters, letter]);
            setLives((prevLives) => prevLives - 1);
          } else {
            setShowNotification(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    if (time === 30 && !showPopup) {
      // setShowPopup(true);
    }

    if (time === 0) {
      setLives(0);
      setPlayable(false);
      setGameOver(true);
    }
  }, [time, showPopup, correctLetters, selectedWord.length]);

  useEffect(() => {
    let interval = null;
    if (playable) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setArrowPosition((prevPosition) => prevPosition + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [playable]);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setLives(9);
    setTime(60);
    setGameOver(false);

    // const random = Math.floor(Math.random() * words.length);
    // selectedWord = words[random];
    socket.emit("start", roomID);
  }

  return (
    <>
      <div className="game-container">
        <div className="hearts-slider-container">
          <div className="slider-container">
            <div
              className="slider-arrow"
              style={{ left: `${arrowPosition}%` }}
            />
            <input
              type="range"
              min="0"
              max="60"
              value={time}
              className="slider"
              readOnly
            />
            {time}
          </div>
          <div className="hearts-container">
            <Hearts lives={lives} />
          </div>
        </div>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <Wrongletters wrongLetters={wrongLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        lives={lives}
        selectedWord={selectedWord}
        playAgain={playAgain}
      />
      {showNotification && (
        <Notification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
      {/* {gameOver && (
        <div className="popup">
          <p>Game Over</p>
          <Button onClick={playAgain}>Play Again</Button>
        </div>
      )} */}
    </>
  );
};

export default Playground;
