import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/SignUp';
// import LandingPage from './components/LandingPage/main/mainpage';
import {LandingPage} from './components'
import DiaryEntryPage from "./components/DiaryEntryPage/page"

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
      <LandingPage />
      {/* <DiaryEntryPage /> */}
    </Router>
  );
}

export default App;
