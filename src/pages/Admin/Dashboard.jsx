import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiUsers,
  FiSettings,
  FiUser,
  FiFileText,
  FiPackage,
  FiTrash,
  FiMapPin,
  FiTruck,
  FiMap,
  FiRefreshCcw, // Replace FiRecycle with another icon if necessary
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get("http://localhost:8000/auth/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center py-6 border-b border-gray-200">
          <span className="text-2xl font-bold text-gray-700">NRC</span>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/dashboard/pet_bottles"
            className="flex items-center p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-200"
          >
            <FiPackage className="text-2xl mr-3" />
            <span className="text-lg font-medium">Pet Bottles</span>
          </Link>
          <Link
            to="/dashboard/hotspot_mapping"
            className="flex items-center p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-200"
          >
            <FiMap className="text-2xl mr-3" />
            <span className="text-lg font-medium">Hotspot Mapping</span>
          </Link>
       
          

          <Link
            to="/dashboard/waste_collection"
            className="flex items-center p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-200"
          >
            <FiTruck className="text-2xl mr-3" />
            <span className="text-lg font-medium">Waste Collection</span>
          </Link>
          <Link
            to="/dashboard/river_interception"
            className="flex items-center p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-200"
          >
            <FiMapPin className="text-2xl mr-3" />
            <span className="text-lg font-medium">River Interception</span>
          </Link>

      

        

          <Link
            to="/adminlogin"
            className="flex items-center p-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition duration-200"
          >
            <FiUser className="text-2xl mr-3" />
            <span className="text-lg font-medium">Sign In</span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-red-500 hover:bg-red-50 rounded-md transition duration-200"
          >
            <FiLogOut className="text-2xl mr-3" />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Project BlueCap</h1>
          <FiMenu
            className="lg:hidden text-3xl text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </header>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
