import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiHome,
  FiShoppingBag,
  FiPrinter,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";

const CreateOrder = () => {
  // Dummy data for cleaning items by category (prices in Kenyan Shillings)
  const cleaningCategories = {
    "Dry Cleaning": [
      { name: "Shirt", price: 600 },
      { name: "Blouse", price: 700 },
      { name: "Dress", price: 1200 },
      { name: "Pants", price: 800 },
      { name: "Skirt", price: 850 },
    ],
    Laundry: [
      { name: "T-Shirt", price: 400 },
      { name: "Jeans", price: 600 },
      { name: "Sweater", price: 700 },
      { name: "Underwear", price: 300 },
      { name: "Socks", price: 200 },
    ],
    "Carpet & Duvet": [
      { name: "Small Carpet", price: 2500 },
      { name: "Medium Carpet", price: 3500 },
      { name: "Large Carpet", price: 4500 },
      { name: "Single Duvet", price: 2000 },
      { name: "Double Duvet", price: 3000 },
    ],
    "Suits & Formal": [
      { name: "Men's Suit", price: 2500 },
      { name: "Women's Suit", price: 2200 },
      { name: "Overcoat", price: 2800 },
      { name: "Tuxedo", price: 3200 },
      { name: "Evening Gown", price: 3500 },
    ],
    "Special Items": [
      { name: "Leather Jacket", price: 4000 },
      { name: "Wedding Dress", price: 9000 },
      { name: "Curtains", price: 3000 },
      { name: "Pillow", price: 1000 },
      { name: "Blanket", price: 2000 },
    ],
  };

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    specialInstructions: "",
  });

  const [orderDetails, setOrderDetails] = useState({
    serviceType: "pickup",
    items: [],
    pickupDate: "",
    deliveryDate: "",
    paymentMethod: "mpesa",
    total: 0,
  });

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const availableDates = generateDates();

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (item) => {
    const existingItemIndex = orderDetails.items.findIndex(
      (i) => i.name === item.name
    );

    if (existingItemIndex >= 0) {
      // Item exists, increase quantity
      const updatedItems = [...orderDetails.items];
      updatedItems[existingItemIndex].quantity += 1;
      setOrderDetails((prev) => ({
        ...prev,
        items: updatedItems,
        total: prev.total + item.price,
      }));
    } else {
      // New item
      setOrderDetails((prev) => ({
        ...prev,
        items: [...prev.items, { ...item, quantity: 1 }],
        total: prev.total + item.price,
      }));
    }
  };

  const removeItem = (item) => {
    const existingItemIndex = orderDetails.items.findIndex(
      (i) => i.name === item.name
    );

    if (existingItemIndex >= 0) {
      const updatedItems = [...orderDetails.items];

      if (updatedItems[existingItemIndex].quantity > 1) {
        // Decrease quantity
        updatedItems[existingItemIndex].quantity -= 1;
        setOrderDetails((prev) => ({
          ...prev,
          items: updatedItems,
          total: prev.total - item.price,
        }));
      } else {
        // Remove item completely
        updatedItems.splice(existingItemIndex, 1);
        setOrderDetails((prev) => ({
          ...prev,
          items: updatedItems,
          total: prev.total - item.price,
        }));
      }
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #74124A; }
            .receipt { border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: 0 auto; }
            .section { margin-bottom: 20px; }
            .section-title { border-bottom: 1px solid #74124A; padding-bottom: 5px; color: #74124A; }
            .item-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            .total-row { font-weight: bold; border-top: 1px solid #ddd; padding-top: 10px; margin-top: 10px; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <h1>Aisha Laundry Order Receipt</h1>
            
            <div class="section">
              <h2 class="section-title">Customer Information</h2>
              <p><strong>Name:</strong> ${customerInfo.name}</p>
              <p><strong>Phone:</strong> ${customerInfo.phone}</p>
              <p><strong>Email:</strong> ${customerInfo.email || "N/A"}</p>
              <p><strong>Address:</strong> ${customerInfo.address || "N/A"}</p>
            </div>
            
            <div class="section">
              <h2 class="section-title">Order Details</h2>
              <p><strong>Service Type:</strong> ${orderDetails.serviceType}</p>
              ${
                orderDetails.pickupDate
                  ? `<p><strong>Pickup Date:</strong> ${orderDetails.pickupDate}</p>`
                  : ""
              }
              ${
                orderDetails.deliveryDate
                  ? `<p><strong>Delivery Date:</strong> ${orderDetails.deliveryDate}</p>`
                  : ""
              }
              <p><strong>Payment Method:</strong> ${
                orderDetails.paymentMethod
              }</p>
              
              <h3>Items</h3>
              ${orderDetails.items
                .map(
                  (item) => `
                <div class="item-row">
                  <span>${item.name} × ${item.quantity}</span>
                  <span>KSh ${(
                    item.price * item.quantity
                  ).toLocaleString()}</span>
                </div>
              `
                )
                .join("")}
              
              <div class="item-row total-row">
                <span>Total:</span>
                <span>KSh ${orderDetails.total.toLocaleString()}</span>
              </div>
            </div>
            
            ${
              customerInfo.specialInstructions
                ? `
            <div class="section">
              <h2 class="section-title">Special Instructions</h2>
              <p>${customerInfo.specialInstructions}</p>
            </div>
            `
                : ""
            }
            
            <p style="margin-top: 30px; text-align: center;">Thank you for your business!</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ customerInfo, orderDetails });
    alert("Order submitted successfully!");

    // Reset form after submission
    setCustomerInfo({
      name: "",
      phone: "",
      email: "",
      address: "",
      specialInstructions: "",
    });

    setOrderDetails({
      serviceType: "pickup",
      items: [],
      pickupDate: "",
      deliveryDate: "",
      paymentMethod: "mpesa",
      total: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Side Navigation - Hidden on mobile, shown on desktop */}
      <div className="hidden md:block w-56 bg-[#74124A] text-white sticky top-0 h-screen">
        <Navigation />
      </div>

      {/* Mobile Navigation - Hidden on desktop */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#74124A] text-white z-50">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-12 pb-16 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-[#74124A] text-white p-4 md:p-6">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
                New Dry Cleaning Order
              </h1>
              <p className="mt-1 md:mt-2 text-sm md:text-base">
                Fill in the details to submit your dry cleaning order
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 md:p-6"
              id="print-content"
            >
              {/* Customer Information */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-[#74124A] border-b border-[#74124A] pb-2 mb-3 md:mb-4">
                  Customer Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="relative">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-[#74124A]" />
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 text-[#74124A]" />
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <FiHome className="absolute left-3 top-3 text-[#74124A]" />
                      <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        className="pl-10 w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-[#74124A] border-b border-[#74124A] pb-2 mb-3 md:mb-4">
                  Order Details
                </h2>

                {/* Service Type */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Service Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          serviceType: "pickup",
                        }))
                      }
                      className={`p-2 md:p-3 rounded-lg border-2 flex items-center justify-center text-xs md:text-sm ${
                        orderDetails.serviceType === "pickup"
                          ? "border-[#74124A] bg-[#74124A] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      <FiMapPin className="mr-1 md:mr-2" />
                      Pickup & Delivery
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          serviceType: "instore",
                        }))
                      }
                      className={`p-2 md:p-3 rounded-lg border-2 flex items-center justify-center text-xs md:text-sm ${
                        orderDetails.serviceType === "instore"
                          ? "border-[#74124A] bg-[#74124A] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      <FiShoppingBag className="mr-1 md:mr-2" />
                      In-Store Service
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() =>
                        setOrderDetails((prev) => ({
                          ...prev,
                          serviceType: "delivery",
                        }))
                      }
                      className={`p-2 md:p-3 rounded-lg border-2 flex items-center justify-center text-xs md:text-sm ${
                        orderDetails.serviceType === "delivery"
                          ? "border-[#74124A] bg-[#74124A] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      <FiHome className="mr-1 md:mr-2" />
                      Delivery Only
                    </motion.button>
                  </div>
                </div>

                {/* Dates - Stacked vertically */}
                {orderDetails.serviceType !== "instore" && (
                  <div className="mb-4 md:mb-6 space-y-3 md:space-y-4">
                    {orderDetails.serviceType !== "delivery" && (
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                          Pickup Date
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {availableDates.map((date, index) => (
                            <motion.div
                              key={`pickup-${index}`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                setOrderDetails((prev) => ({
                                  ...prev,
                                  pickupDate: formatDate(date),
                                }))
                              }
                              className={`p-2 md:p-3 border rounded-lg cursor-pointer text-center text-xs md:text-sm ${
                                orderDetails.pickupDate === formatDate(date)
                                  ? "border-[#74124A] bg-[#74124A] text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              <div className="font-medium">
                                {index === 0
                                  ? "Today"
                                  : index === 1
                                  ? "Tomorrow"
                                  : formatDate(date).split(" ")[0]}
                              </div>
                              <div>
                                {formatDate(date).replace(/^[^,]+, /, "")}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                        Delivery Date
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {availableDates.map((date, index) => (
                          <motion.div
                            key={`delivery-${index}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              setOrderDetails((prev) => ({
                                ...prev,
                                deliveryDate: formatDate(date),
                              }))
                            }
                            className={`p-2 md:p-3 border rounded-lg cursor-pointer text-center text-xs md:text-sm ${
                              orderDetails.deliveryDate === formatDate(date)
                                ? "border-[#74124A] bg-[#74124A] text-white"
                                : "border-gray-300"
                            }`}
                          >
                            <div className="font-medium">
                              {index === 0
                                ? "Today"
                                : index === 1
                                ? "Tomorrow"
                                : formatDate(date).split(" ")[0]}
                            </div>
                            <div>
                              {formatDate(date).replace(/^[^,]+, /, "")}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Items by Category */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                    Select Items for Cleaning
                  </label>

                  {Object.entries(cleaningCategories).map(
                    ([category, items]) => (
                      <div key={category} className="mb-3 md:mb-4">
                        <h3 className="text-sm md:text-md font-medium text-[#74124A] mb-1 md:mb-2">
                          {category}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {items.map((item) => {
                            const itemInCart = orderDetails.items.find(
                              (i) => i.name === item.name
                            );
                            const quantity = itemInCart
                              ? itemInCart.quantity
                              : 0;

                            return (
                              <div
                                key={item.name}
                                className="border rounded-md p-2 md:p-3 flex justify-between items-center"
                              >
                                <div>
                                  <div className="text-xs md:text-sm font-medium">
                                    {item.name}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    KSh {item.price.toLocaleString()}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1 md:space-x-2">
                                  {quantity > 0 && (
                                    <>
                                      <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        type="button"
                                        onClick={() => removeItem(item)}
                                        className="text-[#74124A] hover:text-[#5a0e3a]"
                                      >
                                        <FiMinus size={14} />
                                      </motion.button>
                                      <span className="w-4 md:w-6 text-center text-xs md:text-sm">
                                        {quantity}
                                      </span>
                                    </>
                                  )}
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    onClick={() => addItem(item)}
                                    className="text-[#74124A] hover:text-[#5a0e3a]"
                                  >
                                    <FiPlus size={14} />
                                  </motion.button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Order Summary */}
                {orderDetails.items.length > 0 && (
                  <div className="mb-4 md:mb-6 border-t pt-3 md:pt-4">
                    <h3 className="text-sm md:text-md font-medium text-gray-700 mb-1 md:mb-2">
                      Order Summary
                    </h3>
                    <div className="bg-gray-50 rounded-md p-3 md:p-4">
                      {orderDetails.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between py-1 text-xs md:text-sm"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>
                            KSh {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-xs md:text-sm">
                        <span>Total:</span>
                        <span>KSh {orderDetails.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Method */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Payment Method
                  </label>
                  <div className="flex space-x-3 md:space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mpesa"
                        checked={orderDetails.paymentMethod === "mpesa"}
                        onChange={handleOrderChange}
                        className="text-[#74124A] focus:ring-[#74124A]"
                      />
                      <span className="ml-1 md:ml-2 text-xs md:text-sm">
                        M-Pesa
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={orderDetails.paymentMethod === "cash"}
                        onChange={handleOrderChange}
                        className="text-[#74124A] focus:ring-[#74124A]"
                      />
                      <span className="ml-1 md:ml-2 text-xs md:text-sm">
                        Cash
                      </span>
                    </label>
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="mb-4 md:mb-6">
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    value={customerInfo.specialInstructions}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 text-xs md:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#74124A] focus:border-transparent"
                    placeholder="Any special instructions for your order..."
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 border border-[#74124A] text-[#74124A] rounded-md hover:bg-gray-50 text-xs md:text-sm"
                >
                  <FiPrinter size={14} />
                  Print Order
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-[#74124A] text-white px-4 md:px-6 py-2 md:py-3 rounded-md hover:bg-[#5a0e3a] text-xs md:text-sm"
                >
                  Submit Order
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
