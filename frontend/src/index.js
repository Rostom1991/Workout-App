import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./features/WorkoutSlice";
import detailsReducer from "./features/detailsSlice";
import userReducer from "./features/userSlice";
import { Provider } from "react-redux";

// const initialState = JSON.parse(localStorage.getItem("user"));
const store = configureStore({
  reducer: {
    workout: workoutReducer,
    details: detailsReducer,
    user: userReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
