
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

  return (
    <div className="space-y-6 flex flex-col items-center justify-center h-full">
      <div className="risk-gauge flex flex-col items-center justify-center">
        <div className="text-5xl font-bold mb-2">
          {percentage}%
        </div>
        <div className="text-xl font-medium mb-4">
          {category === 'high' && <span className="text-red-500">High Risk</span>}
          {category === 'medium' && <span className="text-amber-500">Medium Risk</span>}
          {category === 'low' && <span className="text-green-500">Low Risk</span>}
        </div>
        <div className="w-64 mb-4">
          <Progress 
            value={percentage} 
            className={`h-3 ${
              category === 'high' ? 'bg-red-100' : 
              category === 'medium' ? 'bg-amber-100' : 
              'bg-green-100'
            }`}
            indicatorClassName={
              category === 'high' ? 'bg-red-500' : 
              category === 'medium' ? 'bg-amber-500' : 
              'bg-green-500'
            }
          />
        </div>
        <div className="text-xl">
          {category === 'high' && <AlertTriangle className="inline-block mr-2 h-6 w-6 text-red-500" />}
          {category === 'medium' && <AlertCircle className="inline-block mr-2 h-6 w-6 text-amber-500" />}
          {category === 'low' && <CheckCircle className="inline-block mr-2 h-6 w-6 text-green-500" />}
          <span className="text-muted-foreground">{description}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center max-w-md">
        <p className="mb-2 font-medium">Recommended Actions:</p>
        {category === 'high' && (
          <ul className="list-disc list-inside text-left">
            <li>Schedule follow-up within 7 days of discharge</li>
            <li>Implement transitional care program</li>
            <li>Medication reconciliation and review</li>
            <li>Connect with care coordinator and social services</li>
            <li>Home health services evaluation</li>
          </ul>
        )}
        {category === 'medium' && (
          <ul className="list-disc list-inside text-left">
            <li>Schedule follow-up within 14 days of discharge</li>
            <li>Medication reconciliation</li>
            <li>Disease-specific education and self-management</li>
            <li>Consider telehealth monitoring</li>
          </ul>
        )}
        {category === 'low' && (
          <ul className="list-disc list-inside text-left">
            <li>Schedule routine follow-up appointment</li>
            <li>Provide educational materials</li>
            <li>Ensure patient has access to medications</li>
            <li>Standard discharge protocols</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default RiskDisplay;
