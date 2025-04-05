
import React from 'react';
import { motion } from 'framer-motion';

interface RiskBackdropProps {
  category: 'high' | 'medium' | 'low';
}

const RiskBackdrop = ({ category }: RiskBackdropProps) => {
  return (
    <motion.div 
      className={`absolute -z-10 w-56 h-56 rounded-full blur-2xl opacity-20 transition-all duration-1000 ${
        category === 'high' ? 'bg-red-500' : 
        category === 'medium' ? 'bg-amber-500' : 
        'bg-green-500'
      }`}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse"
      }}
    />
  );
};

export default RiskBackdrop;
