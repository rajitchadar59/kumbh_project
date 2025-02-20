'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TicketPage() {
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
    <div>
      <nav className="bg-gray-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-lg font-semibold" href="/">Navbar</Link>
          <button
            className="md:hidden text-gray-700"
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            ☰
          </button>

          <div className={`${isNavCollapsed ? 'hidden' : 'block'} md:flex space-x-28`}>
            <Link className="text-gray-700 hover:text-zinc-950 flex items-center space-x-2 hover:font-bold" href="/booking">
              <img src="train.png" alt="train icon" className="h-6 w-6 rounded-full" />
              <span>Train</span>
            </Link>
            <Link className="text-gray-700 hover:text-zinc-950 flex items-center space-x-2 hover:font-bold" href="/booking">
              <img src="bus.png" alt="bus icon" className="h-6 w-6 rounded-full" />
              <span>Bus</span>
            </Link>
            <Link className="text-gray-700 hover:text-zinc-950 flex items-center space-x-2 hover:font-bold" href="/booking">
              <img src="metro.png" alt="metro icon" className="h-6 w-6 rounded-full" />
              <span>Metro</span>
            </Link>
            <div className="relative dropdown-container">
              <button
                className="text-gray-700  hover:text-zinc-950 hover:font-bold"
                onClick={toggleDropdown}
              >
                Dropdown
              </button>
              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                  <li><Link className="block px-4 py-2 hover:bg-gray-200" href="about">About</Link></li>
                  <li><Link className="block px-4 py-2 hover:bg-gray-200" href="contactus">help</Link></li>
          
                </ul>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md"><Link href="/login">Login</Link></button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md"><Link href="/signup">Signup</Link></button>
          </div>
        </div>
      </nav>
    </div>
  );
}
