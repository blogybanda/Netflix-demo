import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <h1 className="text-red-600 text-3xl md:text-4xl font-bold netflix-font tracking-wide cursor-pointer">NETFLIX</h1>
          <ul className="hidden md:flex space-x-6 text-sm text-gray-200">
            <li className="font-semibold cursor-pointer hover:text-gray-400 transition">Home</li>
            <li className="cursor-pointer hover:text-gray-400 transition">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-400 transition">Movies</li>
            <li className="cursor-pointer hover:text-gray-400 transition">New & Popular</li>
            <li className="cursor-pointer hover:text-gray-400 transition">My List</li>
          </ul>
        </div>
        
        <div className="flex items-center space-x-6 text-white">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <p className="hidden md:block text-sm font-medium cursor-pointer">KIDS</p>
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <div className="flex items-center space-x-2 cursor-pointer">
             <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
