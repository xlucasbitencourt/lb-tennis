import React, { useState, useEffect } from "react";
import "./App.css";
import MainHeader from "./components/MainHeader";

const App = () => {
  const ADD_POINT = "Add Point";
  const RESET_POINT = "Reset point score";
  const RESET_GAME = "Reset game score";
  const RESET_SET = "Reset set score";
  const CHANGE_NAME = "Change Player Name";
  const CONFIRM = "Confirm";
  const EDIT_SETS = "Edit Sets";
  const RESTART = "Restart";

  const [sets, setSets] = useState(3);
  const [editSets, setEditSets] = useState(false);
  const [player1Point, setPlayer1Point] = useState("0");
  const [player2Point, setPlayer2Point] = useState("0");
  const [player1Game, setPlayer1Game] = useState(0);
  const [player2Game, setPlayer2Game] = useState(0);
  const [player1Set, setPlayer1Set] = useState(0);
  const [player2Set, setPlayer2Set] = useState(0);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");
  const [changePlayer1, setChangePlayer1] = useState(false);
  const [changePlayer2, setChangePlayer2] = useState(false);
  const [player1win, setPlayer1win] = useState(false);
  const [player2win, setPlayer2win] = useState(false);
  const [lastPoint, setLastPoint] = useState("");

  useEffect(() => {
    const disableEdit = () => {
      setEditSets(false);
      setChangePlayer1(false);
      setChangePlayer2(false);
    };
    disableEdit();
  }, [player1Point, player2Point, player1Game, player2Game, player1Set, player2Set]);

  useEffect(() => {
    const checkWinner = () => {
      switch (sets) {
        case 1:
          if (player1Set >= 1) setPlayer1win(true);
          if (player2Set >= 1) setPlayer2win(true);
          break;
        case 3:
          if (player1Set >= 2) setPlayer1win(true);
          if (player2Set >= 2) setPlayer2win(true);
          break;
        case 5:
          if (player1Set >= 3) setPlayer1win(true);
          if (player2Set >= 3) setPlayer2win(true);
          break;
        default:
          break;
      }
    };
    checkWinner();
  }, [player1Set, player2Set, sets]);

  const changeSets = (value) => {
    if (value === "-") {
      if (sets >= 3) setSets(sets - 2);
    }
    if (value === "+") {
      if (sets <= 3) setSets(sets + 2);
    }
  };

  const updatePoint = (player) => {
    if (player === 1) {
      setLastPoint(player1Name);
      if (player2Game === 6 && player1Game === 6) {
        tieBreak(1);
        return;
      }
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
      setLastPoint(player2Name);
      if (player2Game === 6 && player1Game === 6) {
        tieBreak(2);
        return;
      }
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

  const tieBreak = (player) => {
    if (player === 1) {
      if (Number(player1Point) >= 6) {
        if (Number(player1Point) - Number(player2Point) >= 1) {
          updateGame(1);
          setPlayer1Point("0");
          setPlayer2Point("0");
        } else setPlayer1Point((Number(player1Point) + 1).toString());
      } else setPlayer1Point((Number(player1Point) + 1).toString());
    }
    if (player === 2) {
      if (Number(player2Point) >= 6) {
        if (Number(player2Point) - Number(player1Point) >= 1) {
          updateGame(2);
          setPlayer1Point("0");
          setPlayer2Point("0");
        } else setPlayer2Point((Number(player2Point) + 1).toString());
      } else setPlayer2Point((Number(player2Point) + 1).toString());
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
            updateSet(1);
            break score1;
          }
        }
        if (player1Game === 6) {
          setPlayer1Game(0);
          setPlayer2Game(0);
          updateSet(1);
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
            updateSet(2);
            break score2;
          }
        }
        if (player2Game === 6) {
          setPlayer1Game(0);
          setPlayer2Game(0);
          updateSet(2);
          break score2;
        }
        setPlayer2Game(player2Game + 1);
      }
    }
  };

  const updateSet = (player) => {
    if (player === 1) {
      setPlayer1Set(player1Set + 1);
    }
    if (player === 2) {
      setPlayer2Set(player2Set + 1);
    }
  };

  const resetGame = () => {
    setPlayer1Point("0");
    setPlayer2Point("0");
    setPlayer1Game(0);
    setPlayer2Game(0);
    setPlayer1Set(0);
    setPlayer2Set(0);
    setPlayer1win(false);
    setPlayer2win(false);
    setLastPoint("");
  };

  return (
      <><MainHeader /><div className="app-container">
      <h2>Tennis Score Tracker by Lucas Bitencourt</h2>
      {player1win && (
        <div className="win">
          <h1>{`${player1Name} wins!`}</h1>
          <button className="add-point" onClick={resetGame}>{RESTART}</button>
        </div>
      )}
      {player2win && (
        <>
          <h1>{`${player2Name} wins!`}</h1>
          <button onClick={resetGame}>{RESTART}</button>
        </>
      )}
      {!player1win && !player2win && (
        <>
          <h1>{`Sets: ${sets}`}</h1>
          {editSets && (
            <div>
              {sets >= 3 && (
                <button className="add-point reset-point" onClick={() => changeSets("-")}>
                  -
                </button>
              )}
              <span> </span>
              {sets <= 3 && (
                <button className="add-point reset-point" onClick={() => changeSets("+")}>
                  +
                </button>
              )}
            </div>
          )}
          <br />
          <button
            className="add-point reset-point"
            onClick={() => setEditSets(!editSets)}
          >
            {editSets ? CONFIRM : EDIT_SETS}
          </button>
          {lastPoint && <h2>{`Last point: ${lastPoint}`}</h2>}
          <div className="score-container">
            <div className="player-container">
              {!changePlayer1 && <h1>{player1Name}</h1>}
              {changePlayer1 && (
                <>
                  <input
                    type="text"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)} />
                  <button
                    className="add-point reset-point"
                    onClick={() => setChangePlayer1(false)}
                  >
                    {CONFIRM}
                  </button>
                </>
              )}
              <h2>{`Sets: ${player1Set}`}</h2>
              <h2>{`Games: ${player1Game}`}</h2>
              <h1>{`Points: ${player1Point}`}</h1>
              <button className="add-point" onClick={() => updatePoint(1)}>
                {ADD_POINT}
              </button>
              <br />
              <br />
              <br />
              <button
                className="add-point reset-point"
                onClick={() => setPlayer1Point("0")}
              >
                {RESET_POINT}
              </button>
              <br />
              <button className="add-point reset-point" onClick={() => setPlayer1Game(0)}>
                {RESET_GAME}
              </button>
              <br />
              <button className="add-point reset-point" onClick={() => setPlayer1Set(0)}>
                {RESET_SET}
              </button>
              <br />
              {!changePlayer1 && (
                <button
                  className="add-point reset-point"
                  onClick={() => setChangePlayer1(true)}
                >
                  {CHANGE_NAME}
                </button>
              )}
            </div>
            <div className="player-container">
              {!changePlayer2 && <h1>{player2Name}</h1>}
              {changePlayer2 && (
                <>
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)} />
                  <button
                    className="add-point reset-point"
                    onClick={() => setChangePlayer2(false)}
                  >
                    {CONFIRM}
                  </button>
                </>
              )}
              <h2>{`Sets: ${player2Set}`}</h2>
              <h2>{`Games: ${player2Game}`}</h2>
              <h1>{`Points: ${player2Point}`}</h1>
              <button className="add-point" onClick={() => updatePoint(2)}>
                {ADD_POINT}
              </button>
              <br />
              <br />
              <br />
              <button
                className="add-point reset-point"
                onClick={() => setPlayer2Point("0")}
              >
                {RESET_POINT}
              </button>
              <br />
              <button className="add-point reset-point" onClick={() => setPlayer2Game(0)}>
                {RESET_GAME}
              </button>
              <br />
              <button className="add-point reset-point" onClick={() => setPlayer2Set(0)}>
                {RESET_SET}
              </button>
              <br />
              {!changePlayer2 && (
                <button
                  className="add-point reset-point"
                  onClick={() => setChangePlayer2(true)}
                >
                  {CHANGE_NAME}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div></>
  );
};

export default App;
