import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import timeCapsuleSlice from "./slices/timeCapsuleSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    timeCapsule: timeCapsuleSlice,
  },
});
