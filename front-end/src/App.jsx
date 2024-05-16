import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/SignUp";
import LandingPage from "./components/LandingPage/mainpage";
// import { LandingPage } from "./components";
import DiaryEntryPage from "./components/DiaryEntryPage/page";
import Homepage from "./components/Homepage/Homepage";
import TimeCapsule from "./components/TimeCapsule/TimeCapsule";
import Slider from "./components/Homepage/Slider/Slider";
import AIBot from "./components/Bot/AI/AI";
import Notes from "./components/Notes/notes";
import About from "./components/About/about";
function App() {
  return (
    // <div>
    //   <Login />
    // </div>
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/timecapsule" element={<TimeCapsule />} />
          <Route path="/diarypage" element={<DiaryEntryPage />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </BrowserRouter>
      {/* <Notes /> */}
      {/* <TimeCapsule /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <LandingPage /> */}
      {/* <Homepage /> */}
      {/* <Homepage /> */}
      {/* <DiaryEntryPage /> */}
    </>
  );
}

export default App;
