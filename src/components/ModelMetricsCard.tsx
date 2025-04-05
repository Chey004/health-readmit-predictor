
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface MetricProps {
  label: string;
  value: number;
  color: string;
}

const Metric = ({ label, value, color }: MetricProps) => {
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
    <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md text-center shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <motion.p 
        className="font-bold text-xl"
        style={{ color }}
      >
        {count.toFixed(2)}
      </motion.p>
    </div>
  );
};

const ModelMetricsCard = () => {
  const metrics = [
    { label: "AUC-ROC", value: 0.82, color: "#10b981" },
    { label: "Sensitivity", value: 0.76, color: "#3b82f6" },
    { label: "Specificity", value: 0.79, color: "#8b5cf6" },
    { label: "PPV", value: 0.68, color: "#f59e0b" },
    { label: "NPV", value: 0.84, color: "#06b6d4" },
    { label: "F1 Score", value: 0.72, color: "#ef4444" },
  ];
  
  return (
    <motion.div 
      className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200 shadow-sm"
      whileHover={{ 
        y: -3, 
        boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.2), 0 8px 10px -6px rgba(16, 185, 129, 0.1)' 
      }}
      transition={{ duration: 0.2 }}
    >
      <p className="font-semibold text-emerald-800 mb-3">Performance Metrics</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        {metrics.map((metric) => (
          <Metric 
            key={metric.label} 
            label={metric.label} 
            value={metric.value} 
            color={metric.color} 
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ModelMetricsCard;
