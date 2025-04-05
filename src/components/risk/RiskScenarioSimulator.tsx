
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { calculateRiskScore } from '@/utils/riskCalculator';
import RiskGauge from './RiskGauge';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';

interface RiskScenarioSimulatorProps {
  initialRisk: number;
  patientData: any;
  onRiskChange: (risk: number) => void;
}

const RiskScenarioSimulator = ({ initialRisk, patientData, onRiskChange }: RiskScenarioSimulatorProps) => {
  const [simulatedData, setSimulatedData] = useState({ ...patientData });
  const [simulatedRisk, setSimulatedRisk] = useState(initialRisk);
  const [originalRisk] = useState(initialRisk);
  
  // Simulated risk factors that can be modified
  const updateScenario = (field: string, value: any) => {
    setSimulatedData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Recalculate risk whenever simulated data changes
  useEffect(() => {
    const newRisk = calculateRiskScore(simulatedData);
    setSimulatedRisk(newRisk);
    onRiskChange(newRisk);
  }, [simulatedData, onRiskChange]);

  const riskDifference = originalRisk - simulatedRisk;
  const riskChangePercentage = Math.round((riskDifference / originalRisk) * 100);
  const category = getRiskCategory(simulatedRisk);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div className="space-y-6">
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h3 className="text-lg font-medium mb-4">Modify Risk Factors</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Adjust these factors to see how lifestyle changes could affect your readmission risk
          </p>
          
          <div className="space-y-8">
            {/* Blood pressure control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="bp-control" className="text-sm font-medium">
                  Blood Pressure Control
                </Label>
                <Switch 
                  id="bp-control" 
                  checked={!simulatedData.hasHypertension}
                  onCheckedChange={(checked) => updateScenario('hasHypertension', !checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Controlled blood pressure can reduce readmission risk by up to 5%
              </p>
            </div>
            
            {/* Physical activity */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="activity" className="text-sm font-medium">
                  Weekly Exercise (hours)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="activity"
                    defaultValue={[0]}
                    max={10}
                    step={1}
                    onValueChange={(value) => updateScenario('exerciseHours', value[0])}
                  />
                  <span className="w-10 text-right">{simulatedData.exerciseHours || 0}h</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Regular exercise can improve cardiovascular health and reduce risk
              </p>
            </div>
            
            {/* Medication adherence */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="medications" className="text-sm font-medium">
                  Medication Count
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="medications"
                    defaultValue={[patientData?.medicationCount || 5]}
                    min={1}
                    max={15}
                    step={1}
                    onValueChange={(value) => updateScenario('medicationCount', value[0])}
                  />
                  <span className="w-10 text-right">{simulatedData.medicationCount}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Optimizing medication regimen with your doctor may reduce risk
              </p>
            </div>
            
            {/* Diabetes management */}
            {patientData?.hasDiabetes && (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="hba1c" className="text-sm font-medium">
                    HbA1c Level (%)
                  </Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Slider
                      id="hba1c"
                      defaultValue={[patientData?.hba1c || 8]}
                      min={5}
                      max={12}
                      step={0.1}
                      onValueChange={(value) => updateScenario('hba1c', value[0])}
                    />
                    <span className="w-10 text-right">{simulatedData.hba1c?.toFixed(1)}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Better diabetes management can significantly reduce readmission risk
                </p>
              </div>
            )}
            
            {/* Stop smoking */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="smoking" className="text-sm font-medium">
                  Quit Smoking
                </Label>
                <Switch 
                  id="smoking" 
                  checked={simulatedData.quitSmoking}
                  onCheckedChange={(checked) => updateScenario('quitSmoking', checked)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Smoking cessation improves heart and lung function, reducing risk
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <motion.div 
          className="bg-card rounded-lg p-6 border shadow-sm flex flex-col items-center"
          animate={{ 
            boxShadow: riskDifference > 0 
              ? ['0 0 0 rgba(16, 185, 129, 0)', '0 0 15px rgba(16, 185, 129, 0.3)', '0 0 0 rgba(16, 185, 129, 0)']
              : 'none'
          }}
          transition={{ 
            duration: 2, 
            repeat: riskDifference > 0 ? Infinity : 0,
            repeatType: 'loop'
          }}
        >
          <h3 className="text-lg font-medium mb-2">Projected Risk</h3>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            See how these changes could affect your readmission risk
          </p>
          
          <div className="relative mb-4">
            <RiskGauge percentage={simulatedRisk} category={category} />
            
            {riskDifference > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
              >
                <Badge className="bg-green-500 hover:bg-green-600">
                  -{riskChangePercentage}%
                </Badge>
              </motion.div>
            )}
          </div>
          
          <div className="w-full">
            <div className="flex justify-between text-sm mb-1">
              <span>Original Risk</span>
              <span className="font-medium">{Math.round(originalRisk * 100)}%</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${originalRisk * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-sm mb-1">
              <span>New Projected Risk</span>
              <span className="font-medium">{Math.round(simulatedRisk * 100)}%</span>
            </div>
            <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${category === 'high' ? 'bg-red-500' : category === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`}
                initial={{ width: `${originalRisk * 100}%` }}
                animate={{ width: `${simulatedRisk * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
          
          <div className="mt-8 w-full">
            <h4 className="font-medium mb-2">Impact Analysis</h4>
            {riskDifference > 0 ? (
              <motion.div 
                className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>
                  <span className="font-bold">Great progress!</span> These changes could reduce your 
                  readmission risk by {riskChangePercentage}%. The most effective change 
                  would be {simulatedData.quitSmoking ? 'quitting smoking' : 
                  simulatedData.exerciseHours > 3 ? 'increasing physical activity' : 
                  !simulatedData.hasHypertension ? 'blood pressure control' : 
                  'optimizing your medication regimen'}.
                </p>
              </motion.div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
                <p>
                  Try adjusting the factors on the left to see potential improvements 
                  to your readmission risk.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RiskScenarioSimulator;
