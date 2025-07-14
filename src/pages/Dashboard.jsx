import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Clock,
  User,
  BookOpen,
  CalendarCheck2,
  TrendingUp,
} from "lucide-react";
import { getAuth, signOut } from "firebase/auth";

const Dashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedName = localStorage.getItem("vocra_username") || "User";
    setUserName(storedName);
  }, []);

  const stats = [
    { icon: <User size={24} />, label: "Interviews", value: "0" },
    { icon: <TrendingUp size={24} />, label: "Avg. Score", value: "0.00" },
    { icon: <Clock size={24} />, label: "Time Spent", value: "0" },
    {
      icon: <CalendarCheck2 size={24} />,
      label: "Last Attempt",
      value: "12 Jul 2025",
    },
  ];

  const quickLinks = [
    { label: "New Interview", icon: <Sun />, href: "/interview" },
    { label: "Feedback", icon: <BookOpen />, href: "/feedback" },
    { label: "Resources", icon: <BookOpen />, href: "/resources" },
    { label: "Settings", icon: <User />, href: "/settings" },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      localStorage.removeItem("vocra_username"); // optional: clean local data
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-slate-700 bg-black sticky top-0 z-50">
        <h1 className="text-xl md:text-2xl font-bold text-blue-400">Vocra</h1>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="rounded-full w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            <User size={20} />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
              <div className="px-4 py-2 border-b">Hello, {userName}</div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-bold">Good Morning 👋</h2>
          <p className="text-muted-foreground mt-1">
            Ready to ace your next interview?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-4 text-center"
            >
              <div className="mb-2 text-blue-400 flex justify-center">
                {stat.icon}
              </div>
              <p className="text-xl font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {quickLinks.map((link, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] rounded-xl p-4 text-center hover:shadow-lg transition-all"
            >
              <div className="mb-2 text-blue-500 flex justify-center">
                {link.icon}
              </div>
              <p className="text-sm font-medium">{link.label}</p>
              <a
                href={link.href}
                className="text-xs text-blue-300 underline mt-1 inline-block"
              >
                Go
              </a>
            </div>
          ))}
        </div>

        {/* Resources & Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-lg font-semibold mb-2">🧠 Tip of the Day</h2>
          <p className="text-sm text-gray-300">
            Use the STAR method (Situation, Task, Action, Result) when answering
            behavioral interview questions.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
