'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
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

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
      
        <Link href="/">
          <img src="kumbhl.jpg" alt="Logo" className="h-16 w-20" />
        </Link>

        
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={handleNavCollapse}
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        
        <div className={`${isNavCollapsed ? 'hidden' : 'block'} md:flex space-x-20`}>
          <Link className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium" href="/generateticket">
            <img src="train.png" alt="Train" className="h-6 w-6" />
            <span>Train</span>
          </Link>
          <Link className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium" href="/generateticket">
            <img src="bus.png" alt="Bus" className="h-6 w-6" />
            <span>Bus</span>
          </Link>
          <Link className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium" href="/generateticket">
            <img src="metro.png" alt="Metro" className="h-6 w-6" />
            <span>Metro</span>
          </Link>

         
          <div className="relative dropdown-container">
            <button className="text-gray-700 hover:text-blue-600 font-medium" onClick={toggleDropdown}>
              More ▼
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg transition-all duration-300">
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-200" href="/order">
                    order something
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 hover:bg-gray-200" href="/contactus">
                    Help & Support
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

       
        <div className="flex space-x-4">
          <Link href="/login">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
              Signup
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-5 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
