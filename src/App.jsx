import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { AnimatePresence, motion } from "framer-motion";
import AuthPage from "./components/Authpage";
import SignupPage from "./components/SignupPage";
import Interviewform from "./pages/Interviewform";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Notfound from "./pages/Notfound";

function App() {
  const location = useLocation();
  const pathname = location?.pathname || "";

  const isInterviewFormPage = pathname.startsWith("/dashboard/interviewform");
  const isdashboard = pathname.startsWith("/dashboard");


  const isLoginPage = pathname === "/login" || pathname === "/signup";
  const isNotFound = pathname === "/404" || pathname === "*";

  const hideNavbar = isInterviewFormPage || isdashboard || isNotFound;

  const pageTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.25 },
  };

  return (
    <>
      {!hideNavbar && (
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
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={<motion.div ><Home /></motion.div>}
            />
            <Route
              path="/login"
              element={<AuthPage />}
            />
            <Route
              path="/signup"
              element={<SignupPage />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <motion.div ><Dashboard /></motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/interviewform"
              element={
                <ProtectedRoute>
                  <motion.div ><Interviewform /></motion.div>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<motion.div ><Notfound /></motion.div>}
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
