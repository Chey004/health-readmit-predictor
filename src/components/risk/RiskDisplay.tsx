
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';

// Import our new component
import RiskGauge from './RiskGauge';
import RiskCategory from './RiskCategory';
import RiskRecommendations from './RiskRecommendations';
import RiskBackdrop from './RiskBackdrop';

interface RiskDisplayProps {
  riskScore: number;
}

const RiskDisplay = ({ riskScore }: RiskDisplayProps) => {
  const category = getRiskCategory(riskScore);
  const description = getRiskDescription(riskScore);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-6 flex flex-col items-center justify-center h-full"
    >
      <motion.div 
        className="risk-gauge flex flex-col items-center justify-center relative p-8 rounded-2xl overflow-hidden"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2,
          type: "spring",
          stiffness: 200, 
          damping: 20 
        }}
      >
        <RiskBackdrop category={category} />
        
        <RiskGauge percentage={riskScore} category={category} />
        
        <RiskCategory category={category} description={description} />
      </motion.div>

      <RiskRecommendations category={category} />
    </motion.div>
  );
};

export default RiskDisplay;
