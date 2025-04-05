
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import RiskGauge from './RiskGauge';
import RiskCategory from './RiskCategory';
import RiskRecommendations from './RiskRecommendations';
import RiskBackdrop from './RiskBackdrop';
import RiskComparisonChart from './RiskComparisonChart';
import RiskScenarioSimulator from './RiskScenarioSimulator';

interface InteractiveRiskDisplayProps {
  riskScore: number;
  patientData?: any;
}

const InteractiveRiskDisplay = ({ riskScore, patientData }: InteractiveRiskDisplayProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [simulatedRisk, setSimulatedRisk] = useState(riskScore);
  
  const category = getRiskCategory(riskScore);
  const description = getRiskDescription(riskScore);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10">
            Overview
          </TabsTrigger>
          <TabsTrigger value="comparison" className="data-[state=active]:bg-primary/10">
            Comparison
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="data-[state=active]:bg-primary/10">
            What If Scenarios
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <motion.div 
              className="risk-gauge flex flex-col items-center justify-center relative p-8 rounded-2xl overflow-hidden min-w-[280px]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: 0.2,
                type: "spring",
                stiffness: 200, 
                damping: 20 
              }}
            >
              <RiskBackdrop category={category} />
              <RiskGauge percentage={riskScore} category={category} />
              <RiskCategory category={category} description={description} />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <span className="text-sm text-muted-foreground block mb-2">
                  Risk percentile among similar patients
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">0%</span>
                  <Progress value={riskScore * 100} className="h-2 flex-1" />
                  <span className="text-sm font-medium">100%</span>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="space-y-6 max-w-md">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-lg p-6 border shadow-sm"
              >
                <h3 className="text-lg font-medium mb-2">Risk Breakdown</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your risk score is influenced by several factors:
                </p>
                <ul className="space-y-3">
                  {patientData?.hasHeartDisease && (
                    <li className="flex justify-between items-center">
                      <span className="text-sm">Heart Disease</span>
                      <Progress value={75} className="h-1.5 w-32" />
                    </li>
                  )}
                  {patientData?.hasDiabetes && (
                    <li className="flex justify-between items-center">
                      <span className="text-sm">Diabetes</span>
                      <Progress value={60} className="h-1.5 w-32" />
                    </li>
                  )}
                  {patientData?.hasHypertension && (
                    <li className="flex justify-between items-center">
                      <span className="text-sm">Hypertension</span>
                      <Progress value={55} className="h-1.5 w-32" />
                    </li>
                  )}
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Age ({patientData?.age || 'N/A'})</span>
                    <Progress value={patientData?.age ? Math.min((patientData.age / 100) * 100, 100) : 50} className="h-1.5 w-32" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Previous Admissions ({patientData?.previousAdmissions || 0})</span>
                    <Progress 
                      value={patientData?.previousAdmissions ? Math.min(patientData.previousAdmissions * 25, 100) : 0} 
                      className="h-1.5 w-32" 
                    />
                  </li>
                </ul>
              </motion.div>
              
              <RiskRecommendations category={category} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <RiskComparisonChart 
            patientRisk={riskScore} 
            patientAge={patientData?.age || 65}
          />
        </TabsContent>
        
        <TabsContent value="scenarios">
          <RiskScenarioSimulator 
            initialRisk={riskScore} 
            patientData={patientData}
            onRiskChange={setSimulatedRisk}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default InteractiveRiskDisplay;
