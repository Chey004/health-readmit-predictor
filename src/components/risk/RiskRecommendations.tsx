
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskRecommendationsProps {
  category: 'high' | 'medium' | 'low';
}

const RiskRecommendations = ({ category }: RiskRecommendationsProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const highRiskRecommendations = [
    'Schedule follow-up within 7 days of discharge', 
    'Implement transitional care program', 
    'Medication reconciliation and review',
    'Connect with care coordinator and social services', 
    'Home health services evaluation'
  ];

  const mediumRiskRecommendations = [
    'Schedule follow-up within 14 days of discharge', 
    'Medication reconciliation', 
    'Disease-specific education and self-management',
    'Consider telehealth monitoring'
  ];

  const lowRiskRecommendations = [
    'Schedule routine follow-up appointment', 
    'Provide educational materials', 
    'Ensure patient has access to medications',
    'Standard discharge protocols'
  ];

  const getRecommendations = () => {
    switch (category) {
      case 'high':
        return highRiskRecommendations;
      case 'medium':
        return mediumRiskRecommendations;
      case 'low':
        return lowRiskRecommendations;
      default:
        return [];
    }
  };

  const getClinicalSupportText = () => {
    switch (category) {
      case 'high':
        return 'Consultation with specialist team recommended. Consider initiating enhanced follow-up protocol.';
      case 'medium':
        return 'Monitor patient closely. Additional diagnostics may be warranted based on clinical judgment.';
      case 'low':
        return 'Standard follow-up recommended. Risk factors appear well-controlled.';
      default:
        return '';
    }
  };

  return (
    <>
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
            <ul className="list-none space-y-3">
              {getRecommendations().map((item, index) => (
                <motion.li 
                  key={index} 
                  className={`flex items-center hover:${
                    category === 'high' ? 'bg-red-100' :
                    category === 'medium' ? 'bg-amber-100' :
                    'bg-green-100'
                  } p-3 rounded-md transition-colors ${
                    index % 2 === 0 ? 
                      category === 'high' ? 'bg-red-50/50' :
                      category === 'medium' ? 'bg-amber-50/50' :
                      'bg-green-50/50' : ''
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  {category === 'high' || category === 'medium' ? (
                    <AlertCircle className={`h-5 w-5 ${
                      category === 'high' ? 'text-red-500' : 'text-amber-500'
                    } mr-3 flex-shrink-0`} />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  )}
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="mt-6 pt-4 border-t border-dashed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-medium mb-2">Clinical Decision Support</p>
              <p className="text-xs text-gray-600">
                {getClinicalSupportText()}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RiskRecommendations;
