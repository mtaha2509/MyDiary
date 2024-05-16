import React from "react";
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
import Slider from "./components/Homepage/Slider/Slider";
import AIBot from "./components/Bot/AI/AI";
import Notes from "./components/Notes/notes";
import { useSelector } from "react-redux";

function PrivateRoutes({ authState }) {
  return <>{authState.isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
}

function RestrictedRoutes({ authState }) {
  return <>{!authState.isAuth ? <Outlet /> : <Navigate to="/homepage" />}</>;
}

function App() {
  const authState = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PrivateRoutes authState={authState} />}>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/diarypage" element={<DiaryEntryPage />} />
          <Route path="/notes" element={<Notes />} />
        </Route>

        <Route element={<RestrictedRoutes authState={authState} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>

    // <DiaryEntryPage />
    // <Notes />
    // <TimeCapsule />
  );
}
export default App;
