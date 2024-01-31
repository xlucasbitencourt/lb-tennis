import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [player1Point, setPlayer1Point] = useState("0");
  const [player2Point, setPlayer2Point] = useState("0");
  const [player1Game, setPlayer1Game] = useState(0);
  const [player2Game, setPlayer2Game] = useState(0);
  const [player1Set, setPlayer1Set] = useState(0);
  const [player2Set, setPlayer2Set] = useState(0);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const updatePoint = (player) => {
    if (player === 1) {
      switch (player1Point) {
        case "0":
          setPlayer1Point("15");
          break;
        case "15":
          setPlayer1Point("30");
          break;
        case "30":
          setPlayer1Point("40");
          break;
        case "40":
          if (player2Point === "40") {
            setPlayer1Point("A");
            setPlayer2Point("40");
            break;
          }
          if (player2Point === "A") {
            setPlayer1Point("40");
            setPlayer2Point("40");
            break;
          }
          setPlayer1Point("0");
          setPlayer2Point("0");
          updateGame(1);
          break;
        case "A":
          setPlayer1Point("0");
          setPlayer2Point("0");
          updateGame(1);
          break;
        default:
          setPlayer1Point("error");
          break;
      }
    }
    if (player === 2) {
      switch (player2Point) {
        case "0":
          setPlayer2Point("15");
          break;
        case "15":
          setPlayer2Point("30");
          break;
        case "30":
          setPlayer2Point("40");
          break;
        case "40":
          if (player1Point === "40") {
            setPlayer2Point("A");
            setPlayer1Point("40");
            break;
          }
          if (player1Point === "A") {
            setPlayer2Point("40");
            setPlayer1Point("40");
            break;
          }
          setPlayer1Point("0");
          setPlayer2Point("0");
          updateGame(2);
          break;
        case "A":
          setPlayer1Point("0");
          setPlayer2Point("0");
          updateGame(2);
          break;
        default:
          setPlayer2Point("error");
          break;
      }
    }
  };

  const updateGame = (player) => {
    if (player === 1) {
      score1: {
        if (player1Game === 5) {
          if (player2Game >= 5) setPlayer1Game(6);
          else {
            setPlayer1Game(0);
            setPlayer2Game(0);
            setPlayer1Set(player1Set + 1);
            break score1;
          }
        }
        if (player1Game === 6) {
          setPlayer1Game(0);
          setPlayer2Game(0);
          setPlayer1Set(player1Set + 1);
          break score1;
        }
        setPlayer1Game(player1Game + 1);
      }
    }
    if (player === 2) {
      score2: {
        if (player2Game === 5) {
          if (player1Game >= 5) setPlayer2Game(6);
          else {
            setPlayer1Game(0);
            setPlayer2Game(0);
            setPlayer2Set(player2Set + 1);
            break score2;
          }
        }
        if (player2Game === 6) {
          setPlayer1Game(0);
          setPlayer2Game(0);
          setPlayer2Set(player2Set + 1);
          break score2;
        }
        setPlayer2Game(player2Game + 1);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Tennis Score Tracker</h1>
      <div className="score-container">
        <div className="player-container">
          <h2>{player1Name}</h2>
          <h3>{`Sets: ${player1Set}`}</h3>
          <h3>{`Games: ${player1Game}`}</h3>
          <h3>{`Points: ${player1Point}`}</h3>
          <button onClick={() => updatePoint(1)}>Add Point</button>
          <br />
          <button onClick={() => setPlayer1Point("0")}>Reset point score</button>
          <br />
          <button onClick={() => setPlayer1Game(0)}>Reset game score</button>
          <br />
          <button onClick={() => setPlayer1Set(0)}>Reset set score</button>
        </div>
        <div className="player-container">
          <h2>{player2Name}</h2>
          <h3>{`Sets: ${player2Set}`}</h3>
          <h3>{`Games: ${player2Game}`}</h3>
          <h3>{`Points: ${player2Point}`}</h3>
          <button onClick={() => updatePoint(2)}>Add Point</button>
          <br />
          <button onClick={() => setPlayer2Point("0")}>Reset point score</button>
          <br />
          <button onClick={() => setPlayer1Game(0)}>Reset game score</button>
          <br />
          <button onClick={() => setPlayer2Set(0)}>Reset set score</button>
        </div>
      </div>
    </div>
  );
};

export default App;
