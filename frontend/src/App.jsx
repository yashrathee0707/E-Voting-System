import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import VoteStatus from './pages/VoteStatus';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="*" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vote-status" element={<VoteStatus />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;
