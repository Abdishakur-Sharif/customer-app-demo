import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaClipboardList, FaUser } from "react-icons/fa";
import logo from "../assets/aisha-logo.svg"; // 

const navLinks = [
  { label: "Home", icon: <FaHome />, to: "/home" },
  { label: "Create", icon: <FaPlus />, to: "/create-order" },
  { label: "Pricing", icon: <FaClipboardList />, to: "/pricing" },
  { label: "Profile", icon: <FaUser />, to: "/profile" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex md:flex-col h-screen w-64 bg-[#74124A] text-white py-6 fixed">
       
        <div className="flex items-center justify-center mb-10">
          <div className="bg-white p-2 rounded-full">
            <img src={logo} alt="Aisha Logo" className="h-14 w-auto" />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-2 px-4">
          {navLinks.map(({ label, icon, to }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-[#5e0e3b] transition ${
                location.pathname === to ? "bg-[#5e0e3b]" : ""
              }`}
            >
              {icon} {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed md:hidden bottom-0 left-0 right-0 bg-[#74124A] text-white flex justify-around items-center h-16 shadow-t z-50">
        {navLinks.map(({ label, icon, to }) => (
          <Link
            key={label}
            to={to}
            className={`flex flex-col items-center justify-center text-xs ${
              location.pathname === to ? "text-white" : "text-gray-300"
            }`}
          >
            <div className="text-lg">{icon}</div>
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
