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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      alert("Request submitted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="font-bold h-auto flex text-black bg-[#f0f8ff] w-96 rounded-lg mx-auto border border-[#38a3a5] border-opacity-100 flex-col gap-4 p-6 shadow-lg mt-40">
      <h1 className="text-2xl my-4 flex justify-center text-[#22577a] font-extrabold">
        Enter your query
      </h1>

      
      <div className="flex justify-between w-5/6 mx-auto">
        <div className="w-[48%]">
          <label className="text-[#38a3a5] font-semibold">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Name"
          />
        </div>
        <div className="w-[48%]">
          <label className="text-[#38a3a5] font-semibold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>

      
      <div className="w-5/6 mx-auto">
        <label className="text-[#38a3a5] font-semibold">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg h-24 bg-[#fff] text-black border border-[#38a3a5] px-4 py-2"
          placeholder="Enter your message"
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="h-12 rounded-full flex justify-center items-center my-4 bg-[#57cc99] w-[85%] mx-auto hover:bg-[#38a3a5] text-white font-bold shadow-md transition duration-300"
      >
        Submit
      </button>
    </div>
  );
};

export default Signup;
