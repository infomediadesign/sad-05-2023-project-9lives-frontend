import React, { useState, useEffect } from 'react'
import Figure from './Figure'
import Wrongletters from './Wrongletters'
import Word from './Word'


const words = ['faana', 'ramleela', 'vikramvedha', 'singam', 'raazi'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Playground() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setwrongLetters] = useState([]);

useEffect(() => {
    const handleKeydown = event => {
    const { key, keyCode} = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
            const letter = key.toLowerCase();

            if (selectedWord.includes(letter)) {
                if (!correctLetters.includes(letter)) {
                  setCorrectLetters(currentLetters => [ ...currentLetters, letter]);

               
                } else {
                    // showNotification();
                }
            } else {
                if (!wrongLetters.includes(letter)) {
                    setwrongLetters(wrongLetters => [ ...wrongLetters, letter]);

                  
                } else {
                    // showNotification();
                }
            
        }
    }
    
    }

    window.addEventListener('keydown', handleKeydown);
        
    return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, playable]);






  return (
        <>
      <div className="game-container">
  <Figure wrongLetters={wrongLetters} />
  <wrongLetters wrongLetters={wrongLetters}/>
  <Word selectedWord={selectedWord} correctLetters={correctLetters} />
</div>
</>
    
  )
}

export default Playground
