
import React, { useState } from 'react';
import { Activity, AlertCircle, BarChart3, Heart, Bell, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-gradient-to-r from-medical-800 to-medical-700 text-white py-4 px-6 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div 
          className="flex items-center gap-3 mb-3 md:mb-0 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            <Activity className={`h-8 w-8 text-accent-400 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
            {isHovered && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold group">
            <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent">Hospital Readmission Risk Predictor</span>
          </h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 hover:text-accent-300 transition-colors px-3 py-1 rounded-md hover:bg-white/10">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center gap-2 hover:text-accent-300 transition-colors px-3 py-1 rounded-md hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
          </button>
          <button className="flex items-center gap-2 hover:text-accent-300 transition-colors px-3 py-1 rounded-md hover:bg-white/10">
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
