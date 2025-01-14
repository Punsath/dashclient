import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiX, FiLogOut, FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { FiFileText } from "react-icons/fi"; // Import FiFileText


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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-20 bg-gradient-to-b from-[#1a202c] to-[#2d3748] shadow-xl p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-20"
        } lg:relative lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-center mb-8">
  <span className="text-white text-2xl font-bold">
    NRC
  </span>
</div>


        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-6 items-center">
         
        <Link
  to="/dashboard/employee"
  className="group relative flex flex-col items-center"
>
  <FiFileText className="text-white text-2xl group-hover:text-blue-400" />
  <span className="absolute left-20 bg-gray-800 text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition duration-200">
    News
  </span>
</Link>
          <Link
  to="/adminlogin"
  className="group relative flex flex-col items-center"
>
  <FiUser className="text-white text-2xl group-hover:text-blue-400" />
  <span className="absolute left-20 bg-gray-800 text-white text-sm rounded-md py-1 px-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition duration-200">
    Sign In
  </span>
</Link>

        </nav>

        {/* Sidebar Footer */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600"
          >
            <FiLogOut className="text-2xl" />
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
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Project BlueCap</h1>
          <FiMenu
            className="lg:hidden text-3xl text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          />
        </header>



        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
