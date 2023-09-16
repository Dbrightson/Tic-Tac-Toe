import React, { useState, useEffect } from "react";
import Square from "./Square";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isBoardFull(squares) {
  return squares.every((square) => square !== null);
}

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "14px",
};

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xPoints, setXPoints] = useState(0);
  const [oPoints, setOPoints] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningStreak, setWinningStreak] = useState(0);

  const handleClick = (i) => {
    if (gameOver || squares[i]) return;

    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? "X" : "O";
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);

    const winner = calculateWinner(squaresCopy);
    if (winner) {
      setShowAlert(true);
      setGameOver(true);
      if (winner === "X") {
        setXPoints(xPoints + 10);
        setWinningStreak(winningStreak + 1);
        if (winningStreak >= 2) {
          setXPoints(xPoints + 20);
        }
        setOPoints(0);
      } else {
        setOPoints(oPoints + 10);
        setWinningStreak(0);
        setXPoints(0);
      }
    }
  };

  useEffect(() => {
    if (!xIsNext && !gameOver && !calculateWinner(squares) && !isBoardFull(squares)) {
      const timer = setTimeout(() => {
        const squaresCopy = [...squares];
        const availableSquares = squaresCopy.reduce((acc, val, index) => {
          if (val === null) {
            acc.push(index);
          }
          return acc;
        }, []);

        if (availableSquares.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableSquares.length);
          const randomSquare = availableSquares[randomIndex];
          squaresCopy[randomSquare] = "O";
          setSquares(squaresCopy);
          setXIsNext(true);

          const computerWinner = calculateWinner(squaresCopy);
          if (computerWinner) {
            setShowAlert(true);
            setGameOver(true);
            if (computerWinner === "X") {
              setXPoints(xPoints + 10);
            } else {
              setOPoints(oPoints + 10);
            }
          }
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [squares, xIsNext, gameOver, xPoints, oPoints]);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setShowAlert(false);
    setGameOver(false);
  };

  let status;
  if (gameOver) {
    status = `Winner: ${calculateWinner(squares)}`;
  } else if (isBoardFull(squares)) {
    status = "It's a Draw!";
  } else {
    status = (
      <span style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "5px" }}>
          Next player:{" "}
          <span style={{ color: xIsNext ? "red" : "blue" }}>
            {xIsNext ? "X" : "O"}
          </span>
        </span>
      </span>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom style={textStyle}>
        {status}
      </Typography>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)" }}>
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      {showAlert && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Typography variant="h6" gutterBottom style={textStyle}>
            {calculateWinner(squares)} is the winner!
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      )}
      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography variant="h6" style={textStyle}>
            {winningStreak >= 2 && (
              <span role="img" aria-label="fire" style={{ fontSize: "20px" }}>
                🔥
              </span>
            )}{" "}
            {winningStreak > 1 ? `Streak x${winningStreak}` : ""}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" style={textStyle}>
            X Points: {xPoints}
          </Typography>
        </div>
        <div>
          <Typography variant="h6" style={textStyle}>
            O Points: {oPoints}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default Board;
