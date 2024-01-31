import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const updateScore = (player) => {
    if (player === 1) {
      setPlayer1Score(player1Score + 1);
    } else {
      setPlayer2Score(player2Score + 1);
    }
  };

  return (
    <div className="app-container">
      <h1>Tennis Score Tracker</h1>
      <div className="score-container">
        <div className="player-container">
          <h2>{player1Name}</h2>
          <h3>{player1Score}</h3>
          <button onClick={() => updateScore(1)}>Add Point</button>
          <br />
          <button onClick={() => setPlayer1Score(0)}>Reset</button>
        </div>
        <div className="player-container">
          <h2>{player2Name}</h2>
          <h3>{player2Score}</h3>
          <button onClick={() => updateScore(2)}>Add Point</button>
          <br />
          <button onClick={() => setPlayer2Score(0)}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
