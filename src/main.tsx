import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexRouter from "./core/router/IndexRouter";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IndexRouter />
  </StrictMode>
);
