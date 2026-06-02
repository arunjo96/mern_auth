import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Forgot from '../pages/Forgot';
import Reset from '../pages/Reset';

const MainRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<Reset />} />
        </Routes>
      </Router>
    </>
  );
}

export default MainRoutes
