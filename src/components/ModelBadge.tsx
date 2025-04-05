
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

const ModelBadge = () => {
  return (
    <div className="relative h-full flex flex-col items-center justify-center p-4">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 via-purple-400/10 to-pink-400/20 rounded-lg"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      <motion.div
        className="relative flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl p-6 rounded-lg shadow-xl border border-indigo-100"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: 1.03, 
          rotate: [0, 1, 0, -1, 0],
          boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.15), 0 10px 10px -5px rgba(79, 70, 229, 0.1)'
        }}
      >
        <motion.div 
          className="rounded-full p-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white mb-4"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Award size={40} />
        </motion.div>
        
        <h3 className="text-xl font-bold text-center text-indigo-900 mb-2">XGBoost Model</h3>
        <p className="text-sm text-gray-600 text-center mb-4">Gradient Boosted Decision Trees</p>
        
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-sm text-gray-700">High accuracy prediction</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-sm text-gray-700">Validated on 50,000+ patients</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-green-500" />
            <span className="text-sm text-gray-700">Continuously updated</span>
          </div>
        </div>
        
        <motion.div 
          className="mt-4 pt-3 border-t border-gray-200 w-full flex justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="flex items-center text-sm text-indigo-600 font-medium">
            <TrendingUp size={14} className="mr-1" />
            Last Updated: June 2023
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ModelBadge;
