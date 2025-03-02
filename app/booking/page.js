"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Booking = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    seatPreference: "upper",
    transportMethod: "Train",
    passengerName: "",
    mobileNumber: "",
  });

  const [availableSeats, setAvailableSeats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeats = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkAvailability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setAvailableSeats(result.seatsAvailable);
    } catch (error) {
      setAvailableSeats(0);
    }
    setLoading(false);
  };

  const handleBooking = async () => {
    if (Object.values(formData).some((field) => field.trim() === "")) {
      alert("Please fill all fields.");
      return;
    }

    if (availableSeats === null || availableSeats <= 0) {
      alert("No seats available. Please check availability first.");
      return;
    }

    try {
      const response = await fetch("/api/bookticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setBookingSuccess(true);
        alert("Ticket booked request sent successfully! Pay now.");
        setAvailableSeats((prev) => Math.max(0, prev - 1));
        router.push("/qr");
      } else {
        alert("No tickets available.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-black flex flex-col items-center justify-center p-10 relative overflow-hidden">
      
      {/* Animated Background Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 opacity-10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      />

      {/* Main Booking Card */}
      <motion.div 
        className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-lg w-96 text-black relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-2xl font-extrabold text-center text-[#38a3a5] mb-6">🚆 Book Your Ticket</h1>

        {/* Form */}
        <div className="flex flex-col gap-y-4">
          
          {/* From - To */}
          <div className="flex gap-4">
            <input name="source" value={formData.source} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-400" type="text" placeholder="From" required />
            <input name="destination" value={formData.destination} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-400" type="text" placeholder="To" required />
          </div>

          {/* Date - Seat Preference */}
          <div className="flex gap-4">
            <input name="date" value={formData.date} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-400" type="date" required />
            <select name="seatPreference" value={formData.seatPreference} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black focus:ring-2 focus:ring-blue-400">
              <option value="upper">Upper</option>
              <option value="lower">Lower</option>
              <option value="middle">Middle</option>
            </select>
          </div>

          {/* Transport Method */}
          <select name="transportMethod" value={formData.transportMethod} onChange={handleChange} className="w-full border border-white/30 rounded-lg p-3 bg-transparent text-black focus:ring-2 focus:ring-blue-400">
            <option value="Train">Train</option>
            <option value="Metro">Metro</option>
            <option value="Bus">Bus</option>
          </select>

          {/* Passenger Name - Mobile No */}
          <div className="flex gap-4">
            <input name="passengerName" value={formData.passengerName} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-400" type="text" placeholder="Passenger Name" required />
            <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-1/2 border border-white/30 rounded-lg p-3 bg-transparent text-black placeholder-gray-300 focus:ring-2 focus:ring-blue-400" type="text" placeholder="Mobile No." required />
          </div>

          {/* Check Availability Button */}
          <motion.button 
            onClick={handleSeats} 
            disabled={loading} 
            className="h-12 bg-blue-500 w-full rounded-full text-black font-bold shadow-lg hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Checking..." : "Check Availability"}
          </motion.button>

          {/* Availability Message */}
          {availableSeats !== null && (
            <p className={`text-center font-semibold ${availableSeats > 0 ? "text-green-400" : "text-red-500"}`}>
              {availableSeats > 0 ? `${availableSeats} seats available` : "No seats available"}
            </p>
          )}

          {/* Book Ticket Button */}
          <motion.button 
            onClick={handleBooking} 
            disabled={availableSeats === null || availableSeats <= 0} 
            className="h-12 bg-green-500 w-full rounded-full text-black font-bold shadow-lg hover:bg-green-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Ticket
          </motion.button>

          {/* Success Message */}
          {bookingSuccess && <p className="text-green-400 text-center font-semibold">✅ Ticket booked request sent successfully!</p>}
        </div>
      </motion.div>
    </div>
  );
};

export default Booking;
