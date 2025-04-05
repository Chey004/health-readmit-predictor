
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskCategoryProps {
  category: 'high' | 'medium' | 'low';
  description: string;
}

const RiskCategory = ({ category, description }: RiskCategoryProps) => {
  return (
    <>
      <motion.div 
        className="text-2xl font-medium mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
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
      
      <motion.div 
        className="text-xl flex items-center justify-center mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <span className="text-muted-foreground text-center">{description}</span>
      </motion.div>
    </>
  );
};

export default RiskCategory;
