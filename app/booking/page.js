"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
        alert("Ticket booked request send  successfully! Pay now.");
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
    <div className="max-w-lg mx-auto bg-[#f0f8ff] border border-[#38a3a5] rounded-xl shadow-lg p-6 mt-40">
      <h1 className="text-2xl font-extrabold text-center text-[#22577a] mb-4">Book Your Ticket</h1>

    
      <div className="flex flex-col gap-y-4">
        <div className="flex gap-4">
          <input name="source" value={formData.source} onChange={handleChange} className="w-1/2 border rounded-lg p-2" type="text" placeholder="From" required />
          <input name="destination" value={formData.destination} onChange={handleChange} className="w-1/2 border rounded-lg p-2" type="text" placeholder="To" required />
        </div>

        <div className="flex gap-4">
          <input name="date" value={formData.date} onChange={handleChange} className="w-1/2 border rounded-lg p-2" type="date" required />
          <select name="seatPreference" value={formData.seatPreference} onChange={handleChange} className="w-1/2 border rounded-lg p-2">
            <option value="upper">Upper</option>
            <option value="lower">Lower</option>
            <option value="middle">Middle</option>
          </select>
        </div>

        <select name="transportMethod" value={formData.transportMethod} onChange={handleChange} className="w-full border rounded-lg p-2">
          <option value="Train">Train</option>
          <option value="Metro">Metro</option>
          <option value="Bus">Bus</option>
        </select>

        <div className="flex gap-4">
          <input name="passengerName" value={formData.passengerName} onChange={handleChange} className="w-1/2 border rounded-lg p-2" type="text" placeholder="Passenger Name" required />
          <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-1/2 border rounded-lg p-2" type="text" placeholder="Mobile No." required />
        </div>

        <button onClick={handleSeats} disabled={loading} className="h-12 bg-[#57cc99] w-full rounded-full text-white font-bold shadow-md hover:bg-[#38a3a5] transition">
          {loading ? "Checking..." : "Check Availability"}
        </button>

        {availableSeats !== null && (
          <p className={`text-center font-semibold ${availableSeats > 0 ? "text-green-600" : "text-red-600"}`}>
            {availableSeats > 0 ? `${availableSeats} seats available` : "No seats available"}
          </p>
        )}

        <button onClick={handleBooking} disabled={availableSeats === null || availableSeats <= 0} className="h-12 bg-[#57cc99] w-full rounded-full text-white font-bold shadow-md hover:bg-[#38a3a5] transition">
          Book Ticket
        </button>

        {bookingSuccess && <p className="text-green-600 text-center font-semibold">✅ Ticket booked successfully!</p>}
      </div>
    </div>
  );
};

export default Booking;
