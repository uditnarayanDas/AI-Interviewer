import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import AuthPage from "./components/Authpage";
import {useLocation} from "react-router-dom";
import SignupPage from "./components/SignupPage";

function App() {
  const Location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {/* <div className="relative min-h-screen w-full bg-black "> */}
      {/* ✅ Background Layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="sticky top-0 z-20">
        <Navbar />
      </div>

      {/* ✅ Page Content */}
      <div
        className={
          isLoginPage
            ? "relative z-10 h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-6 sm:px-10"
            : "relative z-10 max-w-7xl mx-auto pt-28 px-6 pb-20"
        }
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
