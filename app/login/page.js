"use client";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { signIn, isLoaded } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert("All fields are required!");
      return;
    }

    if (!isLoaded) {
      alert("Authentication service is still loading. Please wait.");
      return;
    }

    try {
      const result = await signIn.create({
        identifier: username,
        password,
      });

      if (result.status === "complete") {
        console.log("Logged in successfully");
        alert("Logged in successfully!");

        router.push("/");
      } else {
        console.log("Login failed:", result);
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error logging in:", error.errors);
      alert(error.errors[0]?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="font-bold h-auto flex text-black bg-[#f0f8ff] w-96 rounded-lg mx-auto border border-[#38a3a5] border-opacity-100 flex-col gap-4 p-6 shadow-lg mt-40">
      <h1 className="text-2xl my-4 flex justify-center text-[#22577a] font-extrabold">
        User Login
      </h1>
      <label className="ml-10 text-[#38a3a5] font-semibold">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-5/6 rounded-lg ml-9 h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
        type="text"
        placeholder="Enter your username"
        required
      />
      <label className="ml-10 text-[#38a3a5] font-semibold">Password</label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-5/6 rounded-lg ml-9 h-10 bg-[#fff] text-black border border-[#38a3a5] px-4"
        type="password"
        placeholder="Enter your Password"
        required
      />
      <button
        onClick={handleLogin}
        className="h-12 rounded-full flex justify-center items-center my-4 bg-[#57cc99] w-[85%] mx-auto hover:bg-[#38a3a5] text-white font-bold shadow-md transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
