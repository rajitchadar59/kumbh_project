"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
   
    if (!name.trim() || !username.trim() || !email.trim() || !mobileNumber.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      setEmail("")
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number!");
      mobileNumber("")
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, mobileNumber, password }),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        alert("Signup successful!");
        router.push("/");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="font-bold h-auto flex flex-col text-black bg-[#f0f8ff] w-96 rounded-lg mx-auto border border-[#38a3a5] border-opacity-100 p-6 shadow-lg mt-24">
      <h1 className="text-2xl my-4 flex justify-center text-[#22577a] font-extrabold">
        Create Your Account
      </h1>
      
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[#38a3a5] font-semibold">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div>
          <label className="text-[#38a3a5] font-semibold">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter your Username"
            required
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-[#38a3a5] font-semibold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="email"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div>
          <label className="text-[#38a3a5] font-semibold">Mobile Number</label>
          <input
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
            className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
            type="text"
            placeholder="Enter your Mobile Number"
            required
          />
        </div>
      </div>

    
      <label className="text-[#38a3a5] font-semibold mt-4">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full rounded-lg h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
        type="password"
        placeholder="Enter your Password"
        required
      />

  
      <button
        onClick={handleSubmit}
        className="h-12 rounded-full flex justify-center items-center my-4 bg-[#57cc99] w-full hover:bg-[#38a3a5] text-white font-bold shadow-md transition duration-300"
      >
        Submit
      </button>
    </div>
  );
};

export default Signup;
