import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

// 🟢 1. Import the Redux store and Provider
import { store } from './redux/store';
import { Provider } from 'react-redux';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    {/* 🟢 2. Wrap your <App /> with the <Provider> */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);