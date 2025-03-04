import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Treatments from './pages/Treatments';
import Bookmarks from './pages/Bookmarks';
import InsuranceProvider from './pages/InsuranceProvider'; // Import the new component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/insurance/:provider" element={<InsuranceProvider />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
