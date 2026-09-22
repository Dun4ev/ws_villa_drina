import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { IdilaPage } from "./IdilaPage.tsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/^\/idila\/?$/.test(window.location.pathname) ? <IdilaPage /> : <App />}
  </React.StrictMode>,
);
