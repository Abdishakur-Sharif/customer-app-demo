// src/pages/CustomerHomePage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiCalendar,
  FiUser,
  FiStar,
} from "react-icons/fi";
import Navigation from "../components/Navigation";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const mockOrders = [
  {
    id: "1001",
    status: "In Progress",
    items: ["Shirt", "Trousers"],
    date: "2025-04-20",
    pickupDate: "2025-04-25",
    price: "ksh 500",
    serviceType: "Standard",
  },
  {
    id: "1000",
    status: "Ready for Pickup",
    items: ["Dress", "Blazer"],
    date: "2025-04-15",
    pickupDate: "2025-04-18",
    price: "ksh 1000",
    serviceType: "Premium",
  },
];

const statusIcons = {
  "In Progress": <FiClock className="text-yellow-500" />,
  "Ready for Pickup": <FiCheckCircle className="text-green-500" />,
  Delivered: <FiTruck className="text-blue-500" />,
};

const CustomerHomePage = () => {
  const [greeting, setGreeting] = useState(getGreeting());
  const [activeTab, setActiveTab] = useState("current");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.includes(searchTerm) ||
      order.items.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const currentOrders = filteredOrders.filter(
    (order) => order.status !== "Delivered"
  );
  const pastOrders = filteredOrders.filter(
    (order) => order.status === "Delivered"
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 px-4 sm:px-6 md:px-10 py-10 pb-24 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-1">
                {greeting}, <span className="text-[#74124A]">Abdihafid</span>!
              </h1>
              <p className="text-gray-600">
                Track and manage your laundry orders
              </p>
            </div>

            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <button
                onClick={() => (window.location.href = "/create-order")}
                className="bg-[#74124A] text-white px-6 py-3 rounded-lg hover:bg-[#5e0e3b] transition duration-300 flex items-center justify-center w-full md:w-auto"
              >
                <FiPlus className="mr-2" />
                Create New Order
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-[#74124A]/10 p-3 rounded-full mr-4">
                <FiClock className="text-[#74124A] text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-gray-800">1</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <FiCheckCircle className="text-green-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Ready for Pickup</p>
                <p className="text-2xl font-bold text-gray-800">1</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FiCalendar className="text-blue-500 text-xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Next Pickup</p>
                <p className="text-2xl font-bold text-gray-800">Apr 25</p>
              </div>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                  My Orders
                </h2>

                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTab("current")}
                      className={`px-4 py-1 rounded-md text-sm font-medium ${
                        activeTab === "current"
                          ? "bg-white shadow text-[#74124A]"
                          : "text-gray-600"
                      }`}
                    >
                      Current
                    </button>
                    <button
                      onClick={() => setActiveTab("past")}
                      className={`px-4 py-1 rounded-md text-sm font-medium ${
                        activeTab === "past"
                          ? "bg-white shadow text-[#74124A]"
                          : "text-gray-600"
                      }`}
                    >
                      Past
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab("current")}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === "current"
                        ? "text-[#74124A] border-b-2 border-[#74124A]"
                        : "text-gray-500"
                    }`}
                  >
                    Current ({currentOrders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("past")}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === "past"
                        ? "text-[#74124A] border-b-2 border-[#74124A]"
                        : "text-gray-500"
                    }`}
                  >
                    Past ({pastOrders.length})
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activeTab === "current" && (
                <div className="space-y-4">
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-xl p-5 hover:shadow-md transition duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            {statusIcons[order.status]}
                            <h3 className="text-lg font-semibold text-gray-800 ml-2">
                              Order #{order.id}
                            </h3>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-gray-500 text-sm">Items</p>
                            <p className="text-gray-800">
                              {order.items.join(", ")}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Service Type
                            </p>
                            <p className="text-gray-800">{order.serviceType}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Estimated Pickup
                            </p>
                            <p className="text-gray-800">{order.pickupDate}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t">
                          <p className="text-gray-800 font-medium">
                            {order.price}
                          </p>
                          <button className="text-[#74124A] hover:text-[#5e0e3b] font-medium text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No current orders found</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "past" && (
                <div className="space-y-4">
                  {pastOrders.length > 0 ? (
                    pastOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-xl p-5 hover:shadow-md transition duration-200"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            {statusIcons[order.status]}
                            <h3 className="text-lg font-semibold text-gray-800 ml-2">
                              Order #{order.id}
                            </h3>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                            Completed
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-gray-500 text-sm">Items</p>
                            <p className="text-gray-800">
                              {order.items.join(", ")}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Service Type
                            </p>
                            <p className="text-gray-800">{order.serviceType}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-sm">
                              Completed On
                            </p>
                            <p className="text-gray-800">{order.pickupDate}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t">
                          <p className="text-gray-800 font-medium">
                            {order.price}
                          </p>
                          <div className="flex space-x-3">
                            <button className="text-[#74124A] hover:text-[#5e0e3b] font-medium text-sm">
                              View Details
                            </button>
                            <button className="text-yellow-500 hover:text-yellow-600 font-medium text-sm flex items-center">
                              <FiStar className="mr-1" /> Rate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No past orders found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="mt-8 bg-gradient-to-r from-[#74124A] to-[#9c1a6a] rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Premium Service Available
                </h3>
                <p className="opacity-90">
                  Upgrade to our premium service for faster turnaround and
                  special care for delicate items.
                </p>
              </div>
              <button className="mt-4 md:mt-0 bg-white text-[#74124A] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CustomerHomePage;
