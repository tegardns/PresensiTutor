import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { AlertConfirmProvider } from "./shared/contexts/AlertConfirmContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AlertConfirmProvider>
    <App />
  </AlertConfirmProvider>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered successfully:", reg.scope))
      .catch((err) => console.error("Service Worker registration failed:", err));
  });
}
  