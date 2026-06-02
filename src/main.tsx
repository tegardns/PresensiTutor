import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { AlertConfirmProvider } from "./shared/contexts/AlertConfirmContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AlertConfirmProvider>
    <App />
  </AlertConfirmProvider>
);
  