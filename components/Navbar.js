"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-transparent text-white py-4 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link href="/">
          <motion.h1 
            className="text-2xl font-bold cursor-pointer text-blue-400 hover:text-blue-300 transition"
            whileHover={{ scale: 1.1 }}
          >
            YatraNXT
          </motion.h1>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={handleNavCollapse}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div className={`${isNavCollapsed ? 'hidden' : 'block'} md:flex space-x-10 text-lg font-medium`}> 
        <Link className="hover:text-pink-400 transition duration-300" href="/">Home</Link>
          <Link className="hover:text-blue-400 transition duration-300" href="/generateticket">Train</Link>
          <Link className="hover:text-green-400 transition duration-300" href="/generateticket">Bus</Link>
          <Link className="hover:text-pink-400 transition duration-300" href="/generateticket">Metro</Link>
         
          {/* Dropdown */}
          <div className="relative dropdown-container">
            <button className="hover:text-purple-400 transition duration-300" onClick={toggleDropdown}>
              More ▼
            </button>
            {isDropdownOpen && (
              <motion.ul 
                className="absolute left-0 mt-2 w-40 bg-black bg-opacity-80 text-white border rounded-md shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/order">Order Something</Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-800" href="/contactus">Help & Support</Link>
                </li>
              </motion.ul>
            )}
          </div>
        </div>

        {/* Authentication with Clerk */}
        <div className="flex space-x-4">
          <SignedOut>
            <SignInButton>
              <motion.button 
                className="bg-blue-500 px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                Sign In
              </motion.button>
            </SignInButton>
            <SignUpButton>
              <motion.button 
                className="bg-green-500 px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.1 }}
              >
                Sign Up
              </motion.button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </motion.nav>
  );
}
