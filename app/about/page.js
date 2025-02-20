"use client";

import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-extrabold text-[#22577a] mb-4 text-center">
          About Our Ticketing System
        </h1>

        {/* Problem Section */}
        <section className="mb-6">
          <h2 className="text-xl font-bold text-[#38a3a5] mb-2">The Problem</h2>
          <p className="text-gray-700">
            Priya, a frequent traveler, faces long ticket queues, fraudulent tickets, and difficulty finding last-minute seats. These issues make travel stressful and inconvenient.
          </p>
        </section>

       
        <section className="mb-6">
          <h2 className="text-xl font-bold text-[#38a3a5] mb-2">Our Solution</h2>
          <p className="text-gray-700">
            Our advanced ticketing system allows seamless online booking with QR code-based digital tickets. Automated checkpoints ensure fast and secure entry, making travel hassle-free.
          </p>
        </section>

       
        <section className="mb-6">
          <h2 className="text-xl font-bold text-[#38a3a5] mb-2">The Impact</h2>
          <p className="text-gray-700">
            Transport authorities use smart data analytics to optimize scheduling and pricing, reducing overcrowding. Priya benefits from real-time seat availability and predictive price insights, ensuring a smooth and cost-effective journey.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#38a3a5] mb-2">Key Features</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>🚆 <strong>Multi-Modal Ticketing:</strong> One ticket for buses, trains & metro.</li>
            <li>💺 <strong>Smart Seat Allocation:</strong> Automatically assigns best seats.</li>
            <li>🎁 <strong>Integrated Loyalty Program:</strong> Earn rewards & discounts.</li>
            <li>🎙️ <strong>Voice Command Booking:</strong> Book tickets via voice assistant.</li>
            <li>⚡ <strong>Emergency Rebooking:</strong> Instant alternate route suggestions.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
