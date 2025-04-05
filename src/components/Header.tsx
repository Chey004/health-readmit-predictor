
import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, BarChart3, Heart, Bell, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div 
      className={`bg-gradient-to-r from-medical-800 to-medical-700 text-white py-4 px-6 sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? 'shadow-lg shadow-medical-900/20' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <motion.div 
          className="flex items-center gap-3 mb-3 md:mb-0 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Activity className={`h-8 w-8 text-accent transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
            </motion.div>
            {isHovered && (
              <motion.span 
                className="absolute -top-1 -right-1 flex h-3 w-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </motion.span>
            )}
          </div>
          <h1 className="text-2xl font-bold">
            <motion.span 
              className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent"
              initial={{ backgroundPosition: "0%" }}
              animate={{ backgroundPosition: isHovered ? "100%" : "0%" }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
            >
              Hospital Readmission Risk Predictor
            </motion.span>
          </h1>
        </motion.div>
        <div className="flex gap-4">
          <NavButton icon={<BarChart3 className="h-5 w-5" />} text="Analytics" />
          <NavButton icon={<Bell className="h-5 w-5" />} text="Notifications" />
          <NavButton icon={<HelpCircle className="h-5 w-5" />} text="Help" />
        </div>
      </div>
    </motion.div>
  );
};

const NavButton = ({ icon, text }: { icon: React.ReactNode, text: string }) => {
  return (
    <motion.button 
      className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {icon}
      <span>{text}</span>
    </motion.button>
  );
};

export default Header;
