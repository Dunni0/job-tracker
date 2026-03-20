import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal/modalSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
  },
});