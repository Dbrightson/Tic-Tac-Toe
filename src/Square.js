import React from "react";
import Button from "@mui/material/Button";

const squareStyle = {
  width: "100px",
  height: "100px",
  fontSize: "36px",
  fontWeight: "bold",
  border: "1px solid #ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

function Square({ value, onClick }) {
  const textColor = value === "X" ? "red" : value === "O" ? "blue" : "black";

  return (
    <Button
      style={{ ...squareStyle, color: textColor }}
      variant="outlined"
      onClick={onClick}
    >
      {value}
    </Button>
  );
}

export default Square;
