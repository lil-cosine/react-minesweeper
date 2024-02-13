import React, { useState } from 'react';
import './App.css';
import Board from './board.ts';
import Cell from './Cell.tsx';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [rows, setRows] = useState(5);
  const [cols, setCols] = useState(5);
  const [board, setBoard] = useState(Board({ x: 5, y: 5 }));
  const [gameOver, setGameOver] = useState(false);
  const [revealed, setRevealed] = useState(Array(5).fill(null).map(() => Array(5).fill(false)));

  const updateSize = (x, y) => {
    setRows(x);
    setCols(y);
    setBoard(Board({ x, y }));
    setRevealed(Array(x).fill(null).map(() => Array(y).fill(false)));
    setScore(0);
    setHighScore(0);
  };

  const updateScore = () => {
    setScore(prevScore => {
      const newScore = prevScore + 10;
      setHighScore(prevHighScore => Math.max(prevHighScore, newScore));
      return newScore;
    });
  };

  const handleClick = (x, y) => {
    if (board[x][y] !== "") {
      updateScore();
      updateRevealed(x, y);
      const totalNonMineCells = rows * cols - Math.max(rows, cols);
      const totalRevealedCells = revealed.reduce((acc, row) => acc + row.filter(cell => cell).length, 0);

      if (totalRevealedCells === totalNonMineCells) {
        alert("You win!");
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };


  const updateRevealed = (x, y) => {
    const updatedRevealed = [...revealed];
    updatedRevealed[x][y] = true;
    setRevealed(updatedRevealed);
  };

  const floodReveal = (x, y) => {
  if (revealed[x][y]) {
    return;
  }
  updateScore();
  updateRevealed(x, y);

  const neighbors = [
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: 1, dy: 1 },
  ];

  for (const neighbor of neighbors) {
    const newX = x + neighbor.dx;
    const newY = y + neighbor.dy;

    if (
      newX >= 0 &&
      newX < rows &&
      newY >= 0 &&
      newY < cols &&
      (
        (!revealed[newX][newY] && board[newX][newY] === "") ||
        (board[newX][newY] !== "M" && board[x][y] === "")
      )
    ) {
        floodReveal(newX, newY);
      }
    }
  };


  const reset = () => {
    setGameOver(false);
    setBoard(Board({ x: rows, y: cols }));
    setRevealed(Array(rows).fill(null).map(() => Array(cols).fill(false)));
    setScore(0);
  };

  const containerStyle = {
    margin: "0px",
    padding: "0px 10px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const settingBoxStyle = {
    border: "1px solid black",
    borderRadius: "10px",
    padding: "10px",
    flex: "1",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const gameBoxStyle = {
    flex: "2",
    display: "flex",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const selectStyle = {
    marginBottom: "10px",
    display: "block",
    textAlign: "center",
  };
  const resetButtonStyle = {
    border: "1px solid black",
    borderRadius: "50px"
  }

  return (
    <div style={containerStyle}>
      <div style={settingBoxStyle}>
      <label htmlFor="rows">Number of rows: </label>
      <select name="rows" style={selectStyle} onChange={e => updateSize(parseInt(e.target.value), cols)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <label htmlFor="cols">Number of columns: </label>
      <select name="cols" style={selectStyle} onChange={e => updateSize(rows, parseInt(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <button style={resetButtonStyle} onClick={reset}>Reset</button>
      </div>
      <div style={gameBoxStyle}>
      <pre><h3>Score: {score}   High Score: {highScore}</h3></pre>
      <table>
        <tbody>
          {board.map((row, x) => (
            <tr key={x}>
              {row.map((col, y) => (
                <td key={y}>
                  <Cell
                    x={x}
                    y={y}
                    val={board[x][y]}
                    isRevealed={revealed[x][y]}
                    updateRevealed={updateRevealed}
                    floodReveal={floodReveal}
                    handleClick={handleClick}
                    isMine={board[x][y] === "M"}
                    isGameOver={gameOver}
                    setIsGameOver={setGameOver}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
