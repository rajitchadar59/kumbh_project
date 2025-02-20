"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Booking = () => {
  const router=useRouter();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [seatPreference, setSeatPreference] = useState("upper");
  const [transportMethod, setTransportMethod] = useState("Train"); 
  const [passengerName, setPassengerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [ticketsAvailable, setTicketsAvailable] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = async () => {
    if (!source || !destination || !date || !passengerName || !mobileNumber || !transportMethod) {
      alert("Please fill all fields.");
      return;
    }

    const bookingDetails = {
      source,
      destination,
      date,
      seatPreference,
      transportMethod,
      passengerName,
      mobileNumber,
    };

    try {
      const response = await fetch("http://localhost:3000/api/bookticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      const result = await response.json();
      if (result.success) {
        setBookingSuccess(true);
        alert("Ticket booked successfully!");
        router.push("/qr");
      } else {
        setTicketsAvailable(false);
        alert("No tickets available for this route.");
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="font-bold h-auto flex text-black bg-[#f0f8ff] w-[450px] rounded-lg mx-auto border border-[#38a3a5] border-opacity-100 flex-col gap-4 p-6 shadow-lg mt-40">
      <h1 className="text-2xl my-4 flex justify-center text-[#22577a] font-extrabold">
        Book Your Ticket
      </h1>

      
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">From</label>
          <input
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter Source"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">To</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter Destination"
            required
          />
        </div>
      </div>

     
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">Travel Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="date"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">Seat Preference</label>
          <select
            value={seatPreference}
            onChange={(e) => setSeatPreference(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
          >
            <option value="upper">Upper</option>
            <option value="lower">Lower</option>
            <option value="middle">Middle</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <label className="text-[#38a3a5] font-semibold">Transport Method</label>
        <select
          value={transportMethod}
          onChange={(e) => setTransportMethod(e.target.value)}
          className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
        >
          <option value="Train">Train</option>
          <option value="Metro">Metro</option>
          <option value="Bus">Bus</option>
        </select>
      </div>

      
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">Passenger Name</label>
          <input
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="text-[#38a3a5] font-semibold">Mobile Number</label>
          <input
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter Mobile No."
            required
          />
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="h-12 rounded-full flex justify-center items-center my-4 bg-[#57cc99] w-full hover:bg-[#38a3a5] text-white font-bold shadow-md transition duration-300"
      >
        Book Ticket
      </button>

      {bookingSuccess && (
        <p className="text-green-600 font-semibold text-center">
          ✅ Your ticket application has been send  successfully pay now!
        </p>
      )}
    
      {!ticketsAvailable && (
        <p className="text-red-600 font-semibold text-center">
          ❌ No tickets available for this route.
        </p>
      )}

     
    </div>
  );
};

export default Booking;
