import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import LandingPage from "./components/LandingPage/mainpage";
import DiaryEntryPage from "./components/DiaryEntryPage/page";
import Homepage from "./components/Homepage/Homepage";
import TimeCapsule from "./components/TimeCapsule/TimeCapsule";
import Notes from "./components/Notes/notes";
import About from "./components/About/about";
import ToDoList from "./components/todolist/todolist";

import { useSelector, useDispatch } from "react-redux";
import { fetchProtectedInfo } from "../api/auth";
import { unauthenticateUser } from "./redux/slices/authSlice";

function PrivateRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchProtectedInfo();
        setIsAuthenticated(true);
      } catch (error) {
        dispatch(unauthenticateUser());
        localStorage.removeItem("isAuth");
        setIsAuthenticated(false);
      }
    };

    if (authState.isAuth) {
      checkAuth();
    } else {
      setIsAuthenticated(false);
    }
  }, [authState.isAuth, dispatch]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a spinner/loading indicator
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RestrictedRoutes() {
  const authState = useSelector((state) => state.auth);
  return !authState.isAuth ? <Outlet /> : <Navigate to="/homepage" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/diarypage" element={<DiaryEntryPage />} />
          <Route path="/notes" element={<Notes />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
