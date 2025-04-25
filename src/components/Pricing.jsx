import React, { useState } from "react";
import {
  FiTruck,
  FiShoppingBag,
  FiInfo,
  FiStar,
  FiClock,
} from "react-icons/fi";
import Navigation from "../components/Navigation";

const pricingData = {
  "Dry Cleaning": [
    { item: "Blazer", basePrice: 300, premiumPrice: 400, time: "2 days" },
    { item: "Coat", basePrice: 400, premiumPrice: 500, time: "3 days" },
    { item: "Dress", basePrice: 350, premiumPrice: 450, time: "2 days" },
    { item: "Suit Jacket", basePrice: 280, premiumPrice: 380, time: "2 days" },
    { item: "Skirt", basePrice: 250, premiumPrice: 350, time: "1 day" },
  ],
  Laundry: [
    { item: "Shirt", basePrice: 100, premiumPrice: 150, time: "1 day" },
    { item: "Trousers", basePrice: 120, premiumPrice: 170, time: "1 day" },
    { item: "T-shirt", basePrice: 80, premiumPrice: 120, time: "1 day" },
    { item: "Jeans", basePrice: 150, premiumPrice: 200, time: "1 day" },
    { item: "Sweater", basePrice: 180, premiumPrice: 230, time: "2 days" },
  ],
  Carpets: [
    {
      item: "Small Carpet (up to 2m²)",
      basePrice: 600,
      premiumPrice: 800,
      time: "4 days",
    },
    {
      item: "Medium Carpet (2-4m²)",
      basePrice: 900,
      premiumPrice: 1100,
      time: "5 days",
    },
    {
      item: "Large Carpet (4-6m²)",
      basePrice: 1200,
      premiumPrice: 1500,
      time: "6 days",
    },
  ],
  "Blankets & Curtains": [
    {
      item: "Blanket (Single)",
      basePrice: 300,
      premiumPrice: 400,
      time: "3 days",
    },
    {
      item: "Blanket (Double)",
      basePrice: 450,
      premiumPrice: 550,
      time: "3 days",
    },
    {
      item: "Curtain (per panel)",
      basePrice: 200,
      premiumPrice: 300,
      time: "3 days",
    },
  ],
  "Executive Service": [
    { item: "3-Piece Suit", basePrice: 800, premiumPrice: 1000, time: "1 day" },
    { item: "Evening Gown", basePrice: 900, premiumPrice: 1200, time: "1 day" },
    { item: "Silk Dress", basePrice: 500, premiumPrice: 700, time: "1 day" },
    {
      item: "Leather Jacket",
      basePrice: 1000,
      premiumPrice: 1300,
      time: "2 days",
    },
  ],
};

const Pricing = () => {
  const [selectedTab, setSelectedTab] = useState("instore");
  const [expandedSection, setExpandedSection] = useState("Dry Cleaning");
  const [searchTerm, setSearchTerm] = useState("");

  const calculatePrice = (price) =>
    selectedTab === "pickup" ? price + 100 : price;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const filteredSections = Object.entries(pricingData).filter(
    ([section, items]) =>
      section.toLowerCase().includes(searchTerm.toLowerCase()) ||
      items.some((item) =>
        item.item.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 px-4 sm:px-6 md:px-10 py-10 pb-24 md:pb-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Pricing</h1>
          <p className="text-gray-600">
            Transparent pricing for all our laundry and dry cleaning services
          </p>
        </div>

        {/* Service Type Tabs */}
        <div className="bg-white rounded-xl shadow p-1 mb-8 inline-flex">
          <button
            onClick={() => setSelectedTab("instore")}
            className={`px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-all ${
              selectedTab === "instore"
                ? "bg-[#74124A] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiShoppingBag className="mr-2" />
            In-Store Dropoff
          </button>
          <button
            onClick={() => setSelectedTab("pickup")}
            className={`px-6 py-3 rounded-lg flex items-center text-sm font-medium transition-all ${
              selectedTab === "pickup"
                ? "bg-[#74124A] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiTruck className="mr-2" />
            Pickup & Delivery (+KES 100)
          </button>
        </div>

        {/* Search and Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
            <FiInfo className="mr-2 text-blue-500" />
            <span>All prices in KES. Hover for details.</span>
          </div>
        </div>

        {/* Pricing Sections */}
        <div className="space-y-6">
          {filteredSections.length > 0 ? (
            filteredSections.map(([section, items]) => (
              <div
                key={section}
                className="bg-white shadow rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <h2 className="text-xl font-bold text-[#74124A] mr-3">
                      {section}
                    </h2>
                    <span className="bg-[#74124A]/10 text-[#74124A] text-xs font-medium px-2 py-1 rounded">
                      {items.length} services
                    </span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      expandedSection === section ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {expandedSection === section && (
                  <div className="border-t">
                    <div className="grid grid-cols-12 bg-gray-50 p-4 border-b font-medium text-sm text-gray-500">
                      <div className="col-span-6 md:col-span-5">Item</div>
                      <div className="col-span-3 text-center">Standard</div>
                      <div className="col-span-3 text-center">Premium</div>
                    </div>
                    {items.map(({ item, basePrice, premiumPrice, time }) => (
                      <div
                        key={item}
                        className="grid grid-cols-12 p-4 border-b hover:bg-gray-50 transition-colors group"
                      >
                        <div className="col-span-6 md:col-span-5 flex flex-col">
                          <span className="font-medium text-gray-800">
                            {item}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center mt-1">
                            <FiClock className="mr-1" /> {time}
                          </span>
                        </div>
                        <div className="col-span-3 flex flex-col items-center relative">
                          <span className="font-medium text-gray-800">
                            KES {calculatePrice(basePrice)}
                          </span>
                          <div className="absolute top-full mt-1 hidden group-hover:block bg-white shadow-lg p-3 rounded-lg z-10 w-48">
                            <p className="text-sm text-gray-600">
                              Standard cleaning with basic care
                            </p>
                          </div>
                        </div>
                        <div className="col-span-3 flex flex-col items-center relative">
                          <span className="font-bold text-[#74124A]">
                            KES {calculatePrice(premiumPrice)}
                          </span>
                          <div className="absolute top-full mt-1 hidden group-hover:block bg-white shadow-lg p-3 rounded-lg z-10 w-48">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <FiStar className="text-yellow-500 mr-1" />{" "}
                              Premium care
                            </div>
                            <p className="text-sm text-gray-600">
                              Specialized cleaning with extra care
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No services found
              </h3>
              <p className="text-gray-500">Try adjusting your search query</p>
            </div>
          )}
        </div>

        {/* Service Info Banner */}
        <div className="mt-10 bg-gradient-to-r from-[#74124A] to-[#9c1a6a] rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                Not sure what service you need?
              </h3>
              <p className="opacity-90">
                Our experts can recommend the best cleaning option for your
                items.
              </p>
            </div>
            <button className="bg-white text-[#74124A] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition duration-300 whitespace-nowrap">
              Contact Our Experts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
