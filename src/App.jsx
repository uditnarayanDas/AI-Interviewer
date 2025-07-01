import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import AuthPage from "./components/Authpage";

function App() {
  
  
  return (
    <>
      <div className=" relative min-h-screen w-full bg-black ">
        {/* ✅ Background Layer */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000",
          }}
        />

        {/* ✅ Navbar (Sticky by itself) */}
        <Navbar />

        {/* ✅ Page Content */}
        <div className="relative z-10 max-w-7xl mx-auto pt-28 px-6 pb-20">
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthPage />} />


            </Routes>

          </AnimatePresence>
            
        </div>
      </div>
    </>
  );
}

export default App;
