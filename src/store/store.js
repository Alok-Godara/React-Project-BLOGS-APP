import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Assuming you have an authSlice.js file

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your auth slice reducer here
  }
});

export default store;