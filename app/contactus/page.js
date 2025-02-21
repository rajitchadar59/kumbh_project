"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Failed to submit request");

      alert("Request submitted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-[#f0f8ff] rounded-lg border border-[#38a3a5] shadow-lg mt-20">
      <h1 className="text-2xl text-[#22577a] font-extrabold text-center">Enter your query</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-[#38a3a5] font-semibold">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg h-10 bg-white border px-4" type="text" placeholder="Name" />
        </div>
        <div>
          <label className="text-[#38a3a5] font-semibold">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg h-10 bg-white border px-4" type="email" placeholder="Email" />
        </div>
      </div>
      <label className="text-[#38a3a5] font-semibold mt-4">Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg h-24 bg-white border px-4 py-2 mt-2" placeholder="Enter your message"></textarea>
      <button onClick={handleSubmit} className="mt-4 w-full bg-[#57cc99] h-12 rounded-full text-white font-bold hover:bg-[#38a3a5] transition">Submit</button>
    </div>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const responses = {
    "How to book a ticket?": "Click on get started, enter your booking details, and pay using QR code.",
    "What are the payment methods?": "Only UPI payment method is available.",
    "How do I cancel my ticket?": "This feature will be available shortly.",
    "What is the refund policy?": "There is no Refund Policy.",
    "How to check booking status?": "Click on check ticket status and enter your transaction ID and mobile number.",
    "Do I need to carry a printout of my ticket?": "No need to print. A digital ticket with a QR code is enough for verification."
  };
  
  const handleQuestionClick = (question) => {
    setMessages([...messages, { text: question, sender: "user" }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: responses[question], sender: "bot" }]);
    }, 500);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg h-full flex flex-col">
      <h2 className="text-lg font-semibold text-center bg-green-600 text-white py-3">Ticket Booking Assistant</h2>
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.sender === "user" ? "bg-green-100 text-green-900 self-end" : "bg-gray-300 text-gray-800 self-start"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 bg-white">
        {Object.keys(responses).map((question, index) => (
          <button key={index} className="bg-green-500 text-white py-2 px-3 rounded-md text-xs hover:bg-green-700 transition-transform hover:scale-105" onClick={() => handleQuestionClick(question)}>
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-10 min-h-screen bg-gray-50 mt-20">
      <Signup />
      <ChatBot />
    </div>
  );
};

export default HomePage;
