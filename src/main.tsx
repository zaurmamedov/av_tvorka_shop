import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/variables.scss";
import "./styles/global.scss";
import App from "./App.tsx";
import { AuthProvider } from "./hooks/useAuth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
