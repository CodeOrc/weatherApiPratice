import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IconContext } from "react-icons";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <IconContext.Provider
    value={{ color: "rgb(105, 105, 230)", className: "weather-icon" }}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </IconContext.Provider>
);
