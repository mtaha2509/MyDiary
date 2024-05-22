import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBIyQqvc-9a8PacIWoep95izfY_2_gLybE",
  authDomain: "mydiary-8488f.firebaseapp.com",
  projectId: "mydiary-8488f",
  storageBucket: "mydiary-8488f.appspot.com",
  messagingSenderId: "954960421681",
  appId: "1:954960421681:web:7de3f6b751214b61c68610",
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
