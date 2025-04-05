
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskGaugeProps {
  percentage: number;
  category: 'high' | 'medium' | 'low';
}

const RiskGauge = ({ percentage, category }: RiskGaugeProps) => {
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const targetPercentage = Math.round(percentage * 100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(targetPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  const categoryColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  return (
    <div className="relative">
      <svg className="w-48 h-48">
        <motion.circle
          cx="96"
          cy="96"
          r="88"
          fill="none"
          strokeWidth="8"
          stroke="#f3f4f6"
          className="opacity-30"
        />
        <motion.circle
          cx="96"
          cy="96"
          r="88"
          fill="none"
          strokeWidth="8"
          stroke={categoryColors[category]}
          strokeLinecap="round"
          strokeDasharray={553.6} // 2 * PI * r
          strokeDashoffset={553.6 * (1 - percentage)}
          initial={{ strokeDashoffset: 553.6 }}
          animate={{ strokeDashoffset: 553.6 * (1 - percentage) }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className={`text-6xl font-bold transition-all duration-500 ${
            category === 'high' ? 'text-red-500' : 
            category === 'medium' ? 'text-amber-500' : 
            'text-green-500'
          }`}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 1,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={displayPercentage}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {displayPercentage}%
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RiskGauge;
