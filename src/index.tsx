import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { FirebaseAppProvider } from "reactfire";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXxGN2ipPe7dOUBhoB-38SUpLWPncv0M",
  authDomain: "pledgeball-org.firebaseapp.com",
  databaseURL: "https://pledgeball-org.firebaseio.com",
  projectId: "pledgeball-org",
  storageBucket: "pledgeball-org.appspot.com",
  messagingSenderId: "274541014837",
  appId: "1:274541014837:web:456740adb9be4d928fa67c",
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
