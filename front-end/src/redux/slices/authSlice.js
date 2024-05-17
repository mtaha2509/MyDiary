import { createSlice } from "@reduxjs/toolkit";

const userAuthFromLocalStorage = () => {
  const isAuth = localStorage.getItem("isAuth");

  if (isAuth && JSON.parse(isAuth) === true) {
    return true;
  }

  return false;
};

const userFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  const isAuth = localStorage.getItem("isAuth");

  if (user && JSON.parse(isAuth) === true) {
    return JSON.parse(user);
  }

  return null;
};

const initialState = {
  isAuth: userAuthFromLocalStorage(),
  user: userFromLocalStorage(), // Adding user to initial state
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticateUser: (state, action) => {
      state.isAuth = true;
      state.user = action.payload; // Setting user information
    },
    unauthenticateUser: (state) => {
      state.isAuth = false;
      state.user = null; // Clearing user information
    },
  },
});

export const { authenticateUser, unauthenticateUser } = authSlice.actions;
export default authSlice.reducer;
