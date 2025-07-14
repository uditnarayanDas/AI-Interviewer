import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import AuthPage from "./components/Authpage";
import { useLocation } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import Interviewform from "./pages/Interviewform";
import ProtectedRoute from "./components/ProtectedRoute";
import InterviewPage from "./pages/InterviewPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const Location = useLocation();
  const isInterviewFormPage = Location.pathname === "/interviewform";
  const isdashboard = Location.pathname === "/dashboard";
  
  const isLoginPage =
    Location.pathname === "/login" || Location.pathname === "/signup";

  return (
    <>
      
      {!(isInterviewFormPage || isdashboard) && (
        <>
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
        </>
      )}

      
      <div
        className={
          
          isdashboard 
            ? "min-h-screen w-full bg-black"
            : isLoginPage
            ? "relative z-10 h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-6 sm:px-10"
            : "relative z-10 max-w-7xl mx-auto pt-28 px-6 pb-20"
        }
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/interviewform"
              element={
                <ProtectedRoute>
                  <Interviewform />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Add more routes as needed */}
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
