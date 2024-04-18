import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/SignUp';
// import LandingPage from './components/LandingPage/main/mainpage';
import {LandingPage} from './components'

function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
      <Route index element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter> */}
    <LandingPage />
    </>
  );
}

export default App;
