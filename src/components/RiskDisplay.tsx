
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';
import { AlertTriangle, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskDisplayProps {
  riskScore: number;
}

const RiskDisplay = ({ riskScore }: RiskDisplayProps) => {
  const [percentage, setPercentage] = useState(0);
  const category = getRiskCategory(riskScore);
  const description = getRiskDescription(riskScore);
  const targetPercentage = Math.round(riskScore * 100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage(targetPercentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  // Define colors based on risk category
  const categoryColors = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500"
  };
  
  const categoryGlows = {
    high: "shadow-[0_0_15px_rgba(239,68,68,0.7)]",
    medium: "shadow-[0_0_15px_rgba(245,158,11,0.7)]",
    low: "shadow-[0_0_15px_rgba(34,197,94,0.7)]"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 flex flex-col items-center justify-center h-full"
    >
      <div className="risk-gauge flex flex-col items-center justify-center relative">
        <motion.div 
          className={`absolute -z-10 w-48 h-48 rounded-full blur-xl opacity-20 transition-all duration-1000 ${
            category === 'high' ? 'bg-red-500' : 
            category === 'medium' ? 'bg-amber-500' : 
            'bg-green-500'
          }`}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className={`text-6xl font-bold mb-2 transition-all duration-500 ${
            category === 'high' ? 'text-red-500' : 
            category === 'medium' ? 'text-amber-500' : 
            'text-green-500'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3 
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={percentage}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {percentage}%
            </motion.span>
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="text-2xl font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {category === 'high' && (
            <motion.span 
              className="text-red-500 flex items-center gap-2"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <AlertTriangle className="inline-block h-6 w-6" />
              High Risk
            </motion.span>
          )}
          {category === 'medium' && (
            <motion.span 
              className="text-amber-500 flex items-center gap-2"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <AlertCircle className="inline-block h-6 w-6" />
              Medium Risk
            </motion.span>
          )}
          {category === 'low' && (
            <motion.span 
              className="text-green-500 flex items-center gap-2"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <CheckCircle className="inline-block h-6 w-6" />
              Low Risk
            </motion.span>
          )}
        </motion.div>
        
        <div className="w-64 mb-4 relative h-8 rounded-full overflow-hidden bg-gray-100 p-1">
          <motion.div
            className={`absolute top-1 left-1 h-6 rounded-full transition-all ${categoryColors[category]} ${categoryGlows[category]}`}
            initial={{ width: '0%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.5
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Activity className={`h-4 w-4 ${category === 'high' ? 'text-white' : category === 'medium' ? 'text-white' : 'text-white'}`} />
          </div>
        </div>
        
        <motion.div 
          className="text-xl flex items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {category === 'high' && <AlertTriangle className="inline-block mr-2 h-6 w-6 text-red-500" />}
          {category === 'medium' && <AlertCircle className="inline-block mr-2 h-6 w-6 text-amber-500" />}
          {category === 'low' && <CheckCircle className="inline-block mr-2 h-6 w-6 text-green-500" />}
          <span className="text-muted-foreground">{description}</span>
        </motion.div>
      </div>

      <motion.div 
        className={`text-sm text-muted-foreground max-w-md backdrop-blur-sm p-5 rounded-lg border border-gray-200 ${
          category === 'high' ? 'bg-red-50/70' :
          category === 'medium' ? 'bg-amber-50/70' :
          'bg-green-50/70'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <p className="mb-3 font-medium text-gray-900">Recommended Actions:</p>
        {category === 'high' && (
          <ul className="list-none space-y-2">
            {['Schedule follow-up within 7 days of discharge', 
              'Implement transitional care program', 
              'Medication reconciliation and review',
              'Connect with care coordinator and social services', 
              'Home health services evaluation'].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-center hover:bg-red-100/70 p-2 rounded-md transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
        {category === 'medium' && (
          <ul className="list-none space-y-2">
            {['Schedule follow-up within 14 days of discharge', 
              'Medication reconciliation', 
              'Disease-specific education and self-management',
              'Consider telehealth monitoring'].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-center hover:bg-amber-100/70 p-2 rounded-md transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
        {category === 'low' && (
          <ul className="list-none space-y-2">
            {['Schedule routine follow-up appointment', 
              'Provide educational materials', 
              'Ensure patient has access to medications',
              'Standard discharge protocols'].map((item, index) => (
              <motion.li 
                key={index} 
                className="flex items-center hover:bg-green-100/70 p-2 rounded-md transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default RiskDisplay;
