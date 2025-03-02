"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
      const response = await fetch("/api/contact", {
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
    <motion.div 
      className="p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg border border-gray-700 shadow-2xl text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Enter Your Query</h1>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="text-gray-400 font-semibold">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg h-10 bg-gray-700 border border-gray-600 px-4 text-white" type="text" placeholder="Name" />
        </div>
        <div>
          <label className="text-gray-400 font-semibold">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg h-10 bg-gray-700 border border-gray-600 px-4 text-white" type="email" placeholder="Email" />
        </div>
      </div>
      <label className="text-gray-400 font-semibold mt-4">Message</label>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-lg h-24 bg-gray-700 border border-gray-600 px-4 py-2 mt-2 text-white" placeholder="Enter your message"></textarea>
      <motion.button 
        onClick={handleSubmit} 
        className="mt-4 w-full bg-blue-500 h-12 rounded-full text-white font-bold hover:bg-blue-600 transition-transform transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit
      </motion.button>
    </motion.div>
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
    <motion.div 
      className="p-8 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-2xl text-white flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-xl font-semibold text-center bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text py-3">Ticket Booking Assistant</h2>
      <div className="flex-grow overflow-y-auto p-4 bg-gray-700 rounded-lg space-y-2">
        {messages.map((msg, index) => (
          <motion.div 
            key={index} 
            className={`max-w-[75%] p-3 rounded-lg text-sm ${msg.sender === "user" ? "bg-green-500 text-white self-end" : "bg-gray-600 text-gray-100 self-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 bg-transparent">
        {Object.keys(responses).map((question, index) => (
          <motion.button 
            key={index} 
            className="bg-teal-500 text-white py-2 px-3 rounded-md text-xs hover:bg-teal-700 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuestionClick(question)}
          >
            {question}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div className="grid grid-cols-2 gap-8 p-12 min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Signup />
      <ChatBot />
    </div>
  );
};

export default HomePage;