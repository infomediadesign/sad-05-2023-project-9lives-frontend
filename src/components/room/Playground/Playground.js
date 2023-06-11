import React, { useState, useEffect } from 'react';
import Wrongletters from '../../Word/Wrongletters/Wrongletters';
import Word from '../../Word/Word';
import Notification from '../../../helpers/Notification/Notification';
import Popup from '../../../helpers/Popup/Popup';
import Hearts from './Heart';
import './Heart.css';

const words = ['fanna', 'ramleela', 'vikramvedha', 'singam', 'raazi']; // to be fetched from db
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Playground() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState(60);
  const [arrowPosition, setArrowPosition] = useState(0);
  const [lives, setLives] = useState(9);
  const [showPopup, setShowPopup] = useState(false);

  
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

    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
      setArrowPosition((prevPosition) => prevPosition + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setLives(9);
    setTime(60);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  useEffect(() => {
    if (time === 30 && !showPopup) {
      setShowPopup(true);
    }
  }, [time, showPopup]);

  return (
    <>
      <div className="game-container">
        <div className="hearts-slider-container">
          <div className="hearts-container">
            <Hearts lives={lives} />
          </div>
          <div className="slider-container">
            <div className="slider-arrow" style={{ left: `${arrowPosition}%` }} />
            <input type="range" min="0" max="60" value={time} className="slider" readOnly />
          </div>
        </div>
        <Wrongletters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      {showNotification && (
        <Notification
          showNotification={showNotification}
          setShowNotification={setShowNotification}
        />
      )}
      {showPopup && (
        <div className="popup">
          <p>Clue</p>
        </div>
      )}
    </>
  );
}

export default Playground;

