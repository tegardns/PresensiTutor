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
  const registerSW = () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker registered successfully:", reg.scope))
      .catch((err) => console.error("Service Worker registration failed:", err));
  };

  if (document.readyState === "complete") {
    registerSW();
  } else {
    window.addEventListener("load", registerSW);
  }
}
  