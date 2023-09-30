import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function GreenLightRedLight() {
  const location = useLocation();
  const { state } = location || {};

  console.log(state);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [boxColor, setBoxColor] = useState('green');
  const [isClickable, setIsClickable] = useState(true); //state to control clickability
  const [n, setN] = useState(10); // Initialize n with a default value
  const [y, setY] = useState(40); // Initialize y with a default value

  const minInterval = 1000;  
  const maxInterval = 1000;  

  const yRef = useRef(y); // Create a mutable reference to y

  // Update n based on difficulty
  useEffect(() => {
    if (state && state.difficulty) {
      const selectedDifficulty = state.difficulty;
      if (selectedDifficulty === 'hard') {
        setN(25);
      } else if (selectedDifficulty === 'medium') {
        setN(15);
      } else {
        setN(10); // Default value for 'easy'
      }
    }
  }, [state]);

  useEffect(() => {
    if (state && state.y) {
      setY(state.y);
    }
  }, [state]);

  console.log(n);
  const handleBoxClick = () => {
    if (gameStarted && !isGameOver && isClickable) {
      if (boxColor === 'red') {
        setIsGameOver(true);
      } else {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore === n) {
          setIsGameOver(true);
        }
        setIsClickable(false);
        setBoxColor('red'); // Change the color to red immediately
        setTimeout(() => {
          setIsClickable(true);
          setBoxColor('green'); // Change the color back to green after a short delay
        }, 25);
      }
    }
  };

  useEffect(() => {
    let interval;
  
    if (gameStarted && !isGameOver) {
      interval = setInterval(() => {
        setBoxColor((prevColor) => (prevColor === 'red' ? 'green' : 'red'));  
        setIsClickable(true); // Re-enable clickability when the color changes
      }, getRandomInterval());
    } else {
      clearInterval(interval); // Clear the interval when the game is over
    }
  
    setTimeout(() => {
      clearInterval(interval);
      setIsGameOver(true);
    }, yRef.current * 1000); // Access the mutable reference using .current
  }, [gameStarted, isGameOver]);

  useEffect(() => {
    if (gameStarted && !isGameOver) {
      const countdown = setInterval(() => {
        if (yRef.current > 0) { // Access the mutable reference using .current
          yRef.current -= 1; // Update the mutable reference
        } else {
          clearInterval(countdown);
          setIsGameOver(true);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [gameStarted, isGameOver]);

  const getRandomInterval = () => {
    return Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;
  };

  return (
    <div className="game-container">
      {isGameOver && score === n && <div className="message">You win!</div>}
      {isGameOver && score !== n && <div className="message">Game Over! You lost the game</div>}
      {!isGameOver && gameStarted && (
        <div
          className={`box ${boxColor}`}
          onClick={handleBoxClick}
          style={{ borderRadius: '12%', width: '100px', height: '100px' }}
        ></div>
      )}
      {!isGameOver && !gameStarted && (
        <button className='button' onClick={() => setGameStarted(true)}>Start Game</button>
      )}
      <div className="score">Score: {score}</div>
      {gameStarted && <div className="timer">Time Left: {yRef.current} seconds</div>}
    </div>
  );
}

export default GreenLightRedLight;
