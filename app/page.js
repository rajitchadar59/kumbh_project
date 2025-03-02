"use client";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-10">
      {/* Header Section */}
      <h1 className="text-6xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
        ✈️ Welcome to YatraNXT 🚆
      </h1>
      <p className="text-lg text-gray-300 text-center max-w-3xl mb-8">
        Book tickets for trains, buses, and metros effortlessly. Secure, fast, and hassle-free travel at your fingertips!
      </p>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mb-12">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-400 transition">
          <h3 className="text-2xl font-semibold text-blue-400 mb-3">🚆 Train Bookings</h3>
          <p className="text-gray-400">Book your train tickets instantly with real-time seat availability.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-green-400 transition">
          <h3 className="text-2xl font-semibold text-green-400 mb-3">🚌 Bus Tickets</h3>
          <p className="text-gray-400">Find and book bus tickets easily across major routes.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-yellow-400 transition">
          <h3 className="text-2xl font-semibold text-yellow-400 mb-3">🚇 Metro Passes</h3>
          <p className="text-gray-400">Get seamless access to metro travel with digital passes.</p>
        </div>
      </div>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-6">
        {isSignedIn ? (
          <>
            <Link
              href="/booking"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-lg hover:scale-105 transition"
            >
              🎟️ Get Started
            </Link>
            <Link
              href="/generateticket"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium shadow-lg hover:scale-105 transition"
            >
              🔍 Check Ticket Status
            </Link>
          </>
        ) : (
          <p className="text-red-500 font-semibold text-lg">⚠️ Please log in to continue.</p>
        )}
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-gray-500 text-center">
        <p className="text-sm">© 2025 YatraNXT. All rights reserved.</p>
        <nav className="flex gap-4 justify-center mt-2">
     
          <Link className="text-sm hover:text-white transition" href="/contactus">Cookies</Link>
        </nav>
      </footer>
    </div>
  );
}
