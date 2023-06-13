import React from 'react';
import { checkWin } from '../../helpers/Helpers';

const Popup = ({ correctLetters, lives, selectedWord, playAgain }) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if (checkWin(correctLetters, lives, selectedWord) === 'win') {
    finalMessage = 'Congratulations! You Won';
    playable = false;
  } else if (checkWin(correctLetters, lives, selectedWord) === 'lose') {
    finalMessage = 'You Lose';
    finalMessageRevealWord = `the movie was: ${selectedWord}`;
    playable = false;
  }

  return (
    <div className="popup-container" style={finalMessage !== '' ? { display: 'flex' } : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  );
};

export default Popup;