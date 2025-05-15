import React, { useState } from 'react';
import MainScreen from './components/MainScreen';
import Game from './Game';
import './App.css';

const App = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => setStarted(true);
  const handleGameOver = () => setStarted(false);

  return (
    <div className="app-container">
      {started ? <Game onGameOver={handleGameOver} /> : <MainScreen onStart={handleStart} />}
    </div>
  );
};

export default App;