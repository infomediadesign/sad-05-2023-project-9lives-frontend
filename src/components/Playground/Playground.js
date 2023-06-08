import React, { useState, useEffect } from 'react';
import Figure from './Figure';
import Wrongletters from '../Wrongletters/Wrongletters';
import Word from '../Word/Word';
import Notification from '../Notification/Notification';
import Popup from '../Popup/Popup';

const words = ['faana', 'ramleela', 'vikramvedha', 'singam', 'raazi'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Playground() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [time, setTime] = useState(60);
  const [arrowPosition, setArrowPosition] = useState(0);

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

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <Wrongletters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        <div className="slider-container">
          <div className="slider-arrow" style={{ left: `${arrowPosition}%` }} />
          <input
            type="range"
            min="0"
            max="60"
            value={time}
            className="slider"
            readOnly
          />
        </div>
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notification
        showNotification={showNotification}
        setShowNotification={setShowNotification}
      />
    </>
  );
}

export default Playground;
