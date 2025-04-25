"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiSettings,
  FiMapPin,
  FiRepeat,
  FiBell,
  FiPhone,
  FiTrash2,
  FiLogOut,
  FiEdit,
  FiCheck,
  FiX,
  FiMail,
  FiCalendar,
  FiClock,
  FiPlus,
  FiAlertTriangle,
  FiChevronDown,
} from "react-icons/fi";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

const sections = [
  { id: "info", label: "Account Information", icon: <FiUser /> },
  { id: "preferences", label: "Service Preferences", icon: <FiSettings /> },
  { id: "address", label: "Delivery Address", icon: <FiMapPin /> },
  { id: "repeat", label: "Scheduled Pickups", icon: <FiRepeat /> },
  { id: "notifications", label: "Notification Settings", icon: <FiBell /> },
  { id: "contact", label: "Contact Support", icon: <FiPhone /> },
  { id: "delete", label: "Account Management", icon: <FiTrash2 /> },
];

const Profile = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [name, setName] = useState("Abdishakur Sharif");
  const [phone, setPhone] = useState("+254 700 000000");
  const [email, setEmail] = useState("customer@example.com");
  const [address, setAddress] = useState("123 Nairobi Street, Kenya");
  const [preferences, setPreferences] = useState([
    "SMS Notifications",
    "Weekly Pickup",
    "Eco-friendly Packaging",
  ]);
  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    app: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPreference, setNewPreference] = useState("");
  const [scheduledPickups, setScheduledPickups] = useState([
    {
      id: 1,
      day: "Tuesday",
      time: "9:00 AM",
      frequency: "Weekly",
      address: "123 Nairobi Street",
    },
  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const addPreference = () => {
    if (newPreference.trim() && !preferences.includes(newPreference)) {
      setPreferences([...preferences, newPreference]);
      setNewPreference("");
    }
  };

  const removePreference = (index) => {
    setPreferences(preferences.filter((_, i) => i !== index));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "info":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                disabled={!isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                disabled={!isEditing}
              />
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#74124A] text-white px-6 py-3 rounded-lg hover:bg-[#5e0e3b] transition duration-300 w-full md:w-auto"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <h3 className="font-medium text-gray-800">
              Your Current Preferences
            </h3>
            <div className="space-y-2">
              {preferences.length > 0 ? (
                preferences.map((pref, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <span>{pref}</span>
                    <button
                      onClick={() => removePreference(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No preferences added yet
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add New Preference
              </label>
              <div className="flex gap-2">
                <input
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addPreference()}
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                  placeholder="E.g. Fragrance-free detergent"
                />
                <button
                  onClick={addPreference}
                  disabled={!newPreference.trim()}
                  className="bg-[#74124A] text-white p-3 rounded-lg hover:bg-[#5e0e3b] transition duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  <FiPlus className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        );

      case "address":
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">
                Address Guidelines
              </h4>
              <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
                <li>Include building name or number</li>
                <li>Specify floor or apartment if applicable</li>
                <li>Add any special delivery instructions</li>
              </ul>
            </div>

            <button className="bg-[#74124A] text-white px-6 py-3 rounded-lg hover:bg-[#5e0e3b] transition duration-300 w-full md:w-auto">
              Save Address
            </button>
          </div>
        );

      case "repeat":
        return (
          <div className="space-y-6">
            {scheduledPickups.length > 0 ? (
              scheduledPickups.map((pickup) => (
                <div
                  key={pickup.id}
                  className="border rounded-xl p-5 hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">
                      Scheduled Pickup
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium w-fit">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-gray-500 text-sm">Day</p>
                      <p className="text-gray-800">{pickup.day}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Time</p>
                      <p className="text-gray-800">{pickup.time}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Frequency</p>
                      <p className="text-gray-800">{pickup.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Address</p>
                      <p className="text-gray-800">{pickup.address}</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end sm:space-x-3 pt-3 border-t space-y-2 sm:space-y-0">
                    <button className="text-gray-600 hover:text-gray-800 font-medium text-sm">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 font-medium text-sm">
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">
                  You have no scheduled pickups
                </p>
                <button className="bg-[#74124A] text-white px-6 py-3 rounded-lg hover:bg-[#5e0e3b] transition duration-300">
                  Schedule a Pickup
                </button>
              </div>
            )}
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-lg">
              <div className="flex items-center mb-2 sm:mb-0">
                <FiMail className="text-[#74124A] mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Order updates and promotions
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer sm:ml-4">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      email: !notifications.email,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#74124A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#74124A]"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-lg">
              <div className="flex items-center mb-2 sm:mb-0">
                <FiPhone className="text-[#74124A] mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">
                    SMS Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Delivery updates and reminders
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer sm:ml-4">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      sms: !notifications.sms,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#74124A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#74124A]"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-lg">
              <div className="flex items-center mb-2 sm:mb-0">
                <FiBell className="text-[#74124A] mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">
                    App Notifications
                  </h4>
                  <p className="text-sm text-gray-500">Order status updates</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer sm:ml-4">
                <input
                  type="checkbox"
                  checked={notifications.app}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      app: !notifications.app,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#74124A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#74124A]"></div>
              </label>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#74124A] mb-4">
                Customer Support
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <FiPhone className="text-[#74124A] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Phone Support</h4>
                    <p className="text-gray-600">+254 712 345678</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Available 8:00 AM - 8:00 PM, 7 days a week
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start">
                  <FiMail className="text-[#74124A] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Email Support</h4>
                    <p className="text-gray-600">
                      support@aishadrycleaner.co.ke
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start">
                  <FiClock className="text-[#74124A] mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Live Chat</h4>
                    <p className="text-gray-600">Available in the mobile app</p>
                    <p className="text-sm text-gray-500 mt-1">
                      9:00 AM - 5:00 PM, Monday to Friday
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency After-Hours Contact */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <div className="flex items-start">
                <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0 text-xl" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Emergency After-Hours Contact
                  </h3>
                  <p className="text-red-700 mb-3">
                    For urgent matters outside business hours
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-red-100">
                    <p className="font-medium text-gray-800 flex items-center">
                      <FiPhone className="mr-2 text-red-500" />
                      +254 733 987654
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Available 24/7 for urgent laundry emergencies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "delete":
        return (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Delete Account
              </h3>
              <p className="text-red-700 mb-4">
                This action cannot be undone. All your data will be permanently
                removed from our systems.
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center w-full">
                <FiTrash2 className="mr-2" />
                Delete My Account Permanently
              </button>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-[#74124A] mb-4">
                Logout
              </h3>
              <p className="text-gray-600 mb-4">
                Sign out of your account on this device
              </p>
              <button
                onClick={() => navigate("/")}
                className="border border-[#74124A] text-[#74124A] px-6 py-3 rounded-lg hover:bg-[#74124A]/10 transition duration-300 flex items-center justify-center w-full"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />

      <main className="flex-1 md:ml-64 px-4 sm:px-6 md:px-8 lg:px-10 py-8 md:py-10 pb-24 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#74124A] to-[#9c1a6a] rounded-xl p-6 text-white mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full w-fit">
                <FiUser className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="opacity-90">{phone}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full flex justify-between items-center p-3 border rounded-lg bg-white"
              >
                <span>
                  {sections.find((sec) => sec.id === activeSection)?.label}
                </span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    mobileMenuOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mobile Menu Dropdown */}
              {mobileMenuOpen && (
                <div className="mt-2 bg-white rounded-lg shadow-lg border">
                  {sections.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      onClick={() => {
                        setActiveSection(id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left ${
                        activeSection === id
                          ? "bg-[#74124A]/10 text-[#74124A]"
                          : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <span
                        className={
                          activeSection === id
                            ? "text-[#74124A]"
                            : "text-gray-500"
                        }
                      >
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Section Nav - Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {sections.map(({ id, label, icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center gap-3 px-5 py-4 text-left transition ${
                      activeSection === id
                        ? "bg-[#74124A]/10 text-[#74124A] border-l-4 border-[#74124A]"
                        : "text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${
                        activeSection === id
                          ? "text-[#74124A]"
                          : "text-gray-500"
                      }`}
                    >
                      {icon}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Content */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white rounded-xl shadow p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {sections.find((sec) => sec.id === activeSection)?.label}
                  </h2>
                  {activeSection !== "delete" &&
                    activeSection !== "contact" && (
                      <button className="text-[#74124A] hover:text-[#5e0e3b] flex items-center mt-2 sm:mt-0">
                        <FiEdit className="mr-1" /> Edit
                      </button>
                    )}
                </div>
                {renderSection()}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
