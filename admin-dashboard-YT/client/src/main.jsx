import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "../src/components/ui/Theme-Provider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
