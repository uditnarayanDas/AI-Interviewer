import React from "react";
import { User, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ showBackButton = false }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      localStorage.removeItem("vocra_username");
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
      alert("Logout failed.");
    }
  };

  const handleLogoClick = () => {
    if (showBackButton) {
      navigate(-1); // 🔙 go back
    } else {
      navigate("/dashboard"); // default behavior
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/5 border-b border-white/10 px-4 sm:px-8 py-4 flex justify-between items-center rounded-2xl">
      <button
        onClick={handleLogoClick}
        className="text-xl sm:text-2xl font-bold bg-white/90 bg-clip-text text-transparent"
      >
        VOCRA
      </button>
      <button
        onClick={handleLogout}
        className="text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-all flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </header>
  );
};

export default DashboardNavbar;
