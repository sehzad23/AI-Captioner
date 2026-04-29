import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Upload from "./pages/Upload"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          {/* 🔥 Protected Route */}
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
