import React, { useState } from "react";
import Board from "./Board";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  // Define light and dark themes
  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // State to track the current theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle between light and dark themes
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Typography variant="h1">Tic Tac Toe</Typography>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Board />
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={toggleDarkMode}>
            Toggle Theme
          </Button>
          <Switch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            color="primary"
            inputProps={{ "aria-label": "toggle dark theme" }}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default App;
