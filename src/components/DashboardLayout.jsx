// DashboardLayout.jsx
import DashboardNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
