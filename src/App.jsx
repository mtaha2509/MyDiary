import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/SignUp';
// import LandingPage from './components/LandingPage/main/mainpage';
import {LandingPage} from './components'
import DiaryEntryPage from "./components/DiaryEntryPage/page"
import Homepage from './components/Homepage/Homepage';
import TimeCapsule from "./components/TimeCapsule/TimeCapsule"
import Slider from './components/Homepage/Slider/Slider';
import AIBot from './components/Bot/AI/AI';
function App() {
  return (
    <Router>
    {/* <BrowserRouter>
      <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter> */}
      {/* <TimeCapsule/> */}
      {/* <Signup/> */}
      {/* <LandingPage /> */}
      <Homepage/>
      {/* <Homepage /> */}
    </Router>
  );
}

export default App;
