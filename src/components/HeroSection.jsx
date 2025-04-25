"use client";

import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/aisha-logo.svg";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-[#800000]/10 via-white to-[#800000]/5">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[80rem] h-[80rem] rounded-full bg-[#800000]/10 blur-[150px]" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/60 to-transparent" />
      </div>

      {/* Header with logo and navigation */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 lg:px-16 flex justify-between items-center">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-3 rounded-lg shadow-md"
        >
          <img
            src={logo}
            alt="Aisha Dry Cleaner"
            className="h-14 w-auto sm:h-16"
          />
        </motion.div>

        {/* Login button */}
        <motion.a
          href="/login"
          className="px-5 py-2.5 rounded-lg bg-white text-[#800000] font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#800000] hover:text-white border border-[#800000]/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Log in
        </motion.a>
      </header>

      {/* Hero Content */}
      <div className="container mx-auto flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white/90 text-[#800000] font-medium shadow-lg backdrop-blur-sm border border-[#800000]/10">
              ✨ Premium Fabric Care Since 2015
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="text-[#800000]">Revitalize</span> Your Wardrobe{" "}
            <br />
            With Our{" "}
            <span className="relative">
              Care
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-[#800000]/40"
                viewBox="0 0 200 10"
              >
                <path
                  d="M0,5 Q100,10 200,5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Experience the difference with Aisha's eco-friendly dry cleaning
            services. We pick up, clean, and deliver your garments with
            meticulous attention to detail.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a
              href="/register"
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-[#800000] to-[#600000] text-white font-semibold shadow-lg hover:shadow-xl hover:from-[#700000] hover:to-[#500000] transition-all duration-300 transform hover:-translate-y-1"
            >
              Schedule a Pickup
            </a>
            
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Floating clothing icons */}
      <motion.div
        className="absolute top-1/4 left-10 text-[#800000]/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21.6 18.2L13 11.8V7h1.5c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-9C4.7 1 4 1.7 4 2.5v3C4 6.3 4.7 7 5.5 7H7v4.8L2.4 18.2c-.5.7-.4 1.6.3 2.1.7.5 1.6.4 2.1-.3L8 14.5V21c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-6.5l3.2 5.5c.3.5.9.8 1.4.8.3 0 .6-.1.9-.2.7-.5.8-1.4.3-2.1z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-16 text-[#800000]/15"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
        </svg>
      </motion.div>
    </section>
  );
}
