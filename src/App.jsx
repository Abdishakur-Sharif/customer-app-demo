import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LogIn from "./components/LogIn";
import ForgotPassword from "./components/ForgotPassword";
import HeroSection from "./components/HeroSection"
import HomePage from "./components/HomePage"
import Pricing from './components/Pricing';
import Profile from './components/Profile';
import CreateOrder from './components/CreateOrder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-order" element={<CreateOrder />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;