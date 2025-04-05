
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ChevronUp } from 'lucide-react';

interface MetricProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

const Metric = ({ label, value, color, delay }: MetricProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16); // approx 60 fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/90 backdrop-blur-sm p-4 rounded-lg text-center shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }}></div>
      <p className="text-sm text-gray-500 font-medium mb-2">{label}</p>
      <motion.p 
        className="font-bold text-2xl"
        style={{ color }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: delay + 0.3, 
          type: "spring", 
          stiffness: 200
        }}
      >
        {count.toFixed(2)}
      </motion.p>
      
      <motion.div 
        className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.7, delay: delay + 0.2 }}
      >
        <motion.div 
          className="h-full rounded-full" 
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

const ModelMetricsCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const metrics = [
    { label: "AUC-ROC", value: 0.82, color: "#10b981", description: "Area under the receiver operating characteristic curve" },
    { label: "Sensitivity", value: 0.76, color: "#3b82f6", description: "True positive rate" },
    { label: "Specificity", value: 0.79, color: "#8b5cf6", description: "True negative rate" },
    { label: "PPV", value: 0.68, color: "#f59e0b", description: "Positive predictive value" },
    { label: "NPV", value: 0.84, color: "#06b6d4", description: "Negative predictive value" },
    { label: "F1 Score", value: 0.72, color: "#ef4444", description: "Harmonic mean of precision and recall" },
  ];
  
  return (
    <motion.div 
      className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border border-emerald-200 shadow-md"
      whileHover={{ 
        boxShadow: '0 15px 30px -5px rgba(16, 185, 129, 0.2), 0 10px 15px -5px rgba(16, 185, 129, 0.1)' 
      }}
      transition={{ duration: 0.3 }}
      layout
    >
      <motion.div 
        className="flex justify-between items-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-semibold text-lg text-emerald-800">Performance Metrics</p>
        <motion.button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-emerald-100 hover:bg-emerald-200 p-1 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp className="h-4 w-4 text-emerald-700" />
          </motion.div>
        </motion.button>
      </motion.div>
      
      <p className="text-emerald-700/80 text-sm mb-5">
        Key model performance indicators based on validation dataset
      </p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {metrics.map((metric, index) => (
          <Metric 
            key={metric.label} 
            label={metric.label} 
            value={metric.value} 
            color={metric.color} 
            delay={index * 0.1}
          />
        ))}
      </div>
      
      {isExpanded && (
        <motion.div 
          className="mt-6 bg-white/80 backdrop-blur-md rounded-lg p-4 shadow-inner"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-emerald-800 font-medium mb-3">Metric Definitions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <motion.div 
                key={`def-${metric.label}`}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="h-5 w-5 rounded-full mr-2 mt-0.5" style={{ backgroundColor: metric.color }}></div>
                <div>
                  <p className="font-medium text-sm">{metric.label}</p>
                  <p className="text-xs text-gray-600">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ModelMetricsCard;
