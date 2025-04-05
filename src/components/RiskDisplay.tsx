
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface RiskDisplayProps {
  riskScore: number;
}

const RiskDisplay = ({ riskScore }: RiskDisplayProps) => {
  const category = getRiskCategory(riskScore);
  const description = getRiskDescription(riskScore);
  const percentage = Math.round(riskScore * 100);

  // Define colors based on risk category
  const categoryColors = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-green-500"
  };

  return (
    <div className="space-y-6 flex flex-col items-center justify-center h-full">
      <div className="risk-gauge flex flex-col items-center justify-center">
        <div className={`text-6xl font-bold mb-2 transition-all duration-500 ${
          category === 'high' ? 'text-red-500' : 
          category === 'medium' ? 'text-amber-500' : 
          'text-green-500'
        }`}>
          {percentage}%
        </div>
        <div className="text-2xl font-medium mb-4 animate-fade-in">
          {category === 'high' && <span className="text-red-500">High Risk</span>}
          {category === 'medium' && <span className="text-amber-500">Medium Risk</span>}
          {category === 'low' && <span className="text-green-500">Low Risk</span>}
        </div>
        <div className="w-64 mb-4 relative h-6 rounded-full overflow-hidden bg-gray-100">
          <Progress 
            value={percentage} 
            className={`h-6 transition-all duration-1000 ${
              category === 'high' ? 'bg-red-100' : 
              category === 'medium' ? 'bg-amber-100' : 
              'bg-green-100'
            }`}
          />
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-1000 ${categoryColors[category]}`} 
            style={{width: `${percentage}%`}} 
          />
        </div>
        <div className="text-xl flex items-center justify-center animate-fade-in">
          {category === 'high' && <AlertTriangle className="inline-block mr-2 h-6 w-6 text-red-500" />}
          {category === 'medium' && <AlertCircle className="inline-block mr-2 h-6 w-6 text-amber-500" />}
          {category === 'low' && <CheckCircle className="inline-block mr-2 h-6 w-6 text-green-500" />}
          <span className="text-muted-foreground">{description}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground max-w-md bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md border border-gray-100">
        <p className="mb-2 font-medium text-gray-900">Recommended Actions:</p>
        {category === 'high' && (
          <ul className="list-none space-y-2">
            {['Schedule follow-up within 7 days of discharge', 
              'Implement transitional care program', 
              'Medication reconciliation and review',
              'Connect with care coordinator and social services', 
              'Home health services evaluation'].map((item, index) => (
              <li key={index} className="flex items-center hover:bg-red-50 p-1 rounded-md transition-colors">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {category === 'medium' && (
          <ul className="list-none space-y-2">
            {['Schedule follow-up within 14 days of discharge', 
              'Medication reconciliation', 
              'Disease-specific education and self-management',
              'Consider telehealth monitoring'].map((item, index) => (
              <li key={index} className="flex items-center hover:bg-amber-50 p-1 rounded-md transition-colors">
                <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {category === 'low' && (
          <ul className="list-none space-y-2">
            {['Schedule routine follow-up appointment', 
              'Provide educational materials', 
              'Ensure patient has access to medications',
              'Standard discharge protocols'].map((item, index) => (
              <li key={index} className="flex items-center hover:bg-green-50 p-1 rounded-md transition-colors">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RiskDisplay;
