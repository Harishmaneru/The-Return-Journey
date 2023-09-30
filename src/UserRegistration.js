import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ColorChangingBox() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    // Validation logic
    let valid = true;

    if (name === '') {
      setNameError('Name is required');
      valid = false;
    } else if (name.length < 3) {
      setNameError('Name must be at least 3 characters long');
      valid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    // Mobile number validation
    if (mobile === '') {
      setMobileError('Mobile number is required');
      valid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError('Invalid mobile number');
      valid = false;
    } else {
      setMobileError('');
    }

    if (valid) {
      let n, y;
      if (difficulty === 'easy') {
        n = 10;
      } else if (difficulty === 'medium') {
        n = 15;
      } else {
        n = 25;
      }
      y = 40;

      // If all validations pass, navigate to the game page
      navigate('/GreenLightRedLight', { state: { difficulty, n, y } });
    }
  };

  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  return (
    <div className="registration-container">
      <h2>Welcome to the Color Challenge Game!</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {nameError && <p className="error-message">{nameError}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </label>
        <label>
          Mobile Number:
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {mobileError && <p className="error-message">{mobileError}</p>}
        </label>
        <label>
          Difficulty Level:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button type="button" className='button' onClick={handleStartGame}>
          Start Game
        </button>
      </form>
    </div>
  );
}

export default ColorChangingBox;
