import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// http 이슈로 인해 서비스 워커 등록 주석 처리
// 서비스 워커 등록
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log(
//         "Service Worker registration successful with scope: ",
//         registration.scope
//       );
//     })
//     .catch((error) => {
//       console.log("Service Worker registration failed: ", error);
//     });
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
