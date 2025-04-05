
import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';
import { AlertTriangle, CheckCircle, AlertCircle, Activity, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskDisplayProps {
  riskScore: number;
}

const RiskDisplay = ({ riskScore }: RiskDisplayProps) => {
  const [percentage, setPercentage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
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
    high: "shadow-[0_0_25px_rgba(239,68,68,0.7)]",
    medium: "shadow-[0_0_25px_rgba(245,158,11,0.7)]",
    low: "shadow-[0_0_25px_rgba(34,197,94,0.7)]"
  };

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
              stroke={
                category === 'high' ? '#ef4444' : 
                category === 'medium' ? '#f59e0b' : 
                '#10b981'
              }
              strokeLinecap="round"
              strokeDasharray={553.6} // 2 * PI * r
              strokeDashoffset={553.6 * (1 - percentage / 100)}
              initial={{ strokeDashoffset: 553.6 }}
              animate={{ strokeDashoffset: 553.6 * (1 - percentage / 100) }}
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
                  key={percentage}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {percentage}%
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
        
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
      </motion.div>

      <motion.button
        onClick={() => setShowDetails(!showDetails)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
          category === 'high' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
          category === 'medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
          'bg-green-100 text-green-700 hover:bg-green-200'
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span>{showDetails ? "Hide recommendations" : "Show recommendations"}</span>
        <motion.div
          animate={{ rotate: showDetails ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className={`text-sm text-muted-foreground max-w-md backdrop-blur-sm p-6 rounded-lg border ${
              category === 'high' ? 'bg-red-50/90 border-red-200' :
              category === 'medium' ? 'bg-amber-50/90 border-amber-200' :
              'bg-green-50/90 border-green-200'
            } shadow-lg`}
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 font-medium text-gray-900 border-b pb-2">Recommended Actions:</p>
            {category === 'high' && (
              <ul className="list-none space-y-3">
                {['Schedule follow-up within 7 days of discharge', 
                  'Implement transitional care program', 
                  'Medication reconciliation and review',
                  'Connect with care coordinator and social services', 
                  'Home health services evaluation'].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className={`flex items-center hover:bg-red-100 p-3 rounded-md transition-colors ${
                      index % 2 === 0 ? 'bg-red-50/50' : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            {category === 'medium' && (
              <ul className="list-none space-y-3">
                {['Schedule follow-up within 14 days of discharge', 
                  'Medication reconciliation', 
                  'Disease-specific education and self-management',
                  'Consider telehealth monitoring'].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className={`flex items-center hover:bg-amber-100 p-3 rounded-md transition-colors ${
                      index % 2 === 0 ? 'bg-amber-50/50' : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            {category === 'low' && (
              <ul className="list-none space-y-3">
                {['Schedule routine follow-up appointment', 
                  'Provide educational materials', 
                  'Ensure patient has access to medications',
                  'Standard discharge protocols'].map((item, index) => (
                  <motion.li 
                    key={index} 
                    className={`flex items-center hover:bg-green-100 p-3 rounded-md transition-colors ${
                      index % 2 === 0 ? 'bg-green-50/50' : ''
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            )}
            
            <motion.div 
              className="mt-6 pt-4 border-t border-dashed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-medium mb-2">Clinical Decision Support</p>
              <p className="text-xs text-gray-600">
                {category === 'high' ? 
                  'Consultation with specialist team recommended. Consider initiating enhanced follow-up protocol.' :
                  category === 'medium' ? 
                    'Monitor patient closely. Additional diagnostics may be warranted based on clinical judgment.' :
                    'Standard follow-up recommended. Risk factors appear well-controlled.'
                }
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RiskDisplay;
