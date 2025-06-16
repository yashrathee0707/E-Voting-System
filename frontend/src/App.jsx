import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import VoteStatus from './pages/VoteStatus';
import CreateVoting from './pages/CreateVoting';
import RescheduleVoting from './pages/RescheduleVoting';
import CancelVoting from './pages/CancelVoting';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/vote-status" element={
          <PrivateRoute>
            <VoteStatus />
          </PrivateRoute>
        } />
        <Route path="/create-voting" element={
          <PrivateRoute>
            <CreateVoting />
          </PrivateRoute>
        } />
        <Route path="/reschedule-voting" element={
          <PrivateRoute>
            <RescheduleVoting />
          </PrivateRoute>
        } />
        <Route path="/cancel-voting" element={
          <PrivateRoute>
            <CancelVoting />
          </PrivateRoute>
        } />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;