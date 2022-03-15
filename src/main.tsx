import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { App } from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider locale="en">
      <ThemeProvider
        theme={createTheme({
          palette: {
            background: { default: "#eeeeee" },
          },
        })}
      >
        <CssBaseline />
        <App />
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
