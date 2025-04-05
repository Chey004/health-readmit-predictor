
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRiskCategory, getRiskDescription } from '@/utils/riskCalculator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Activity, BarChart2, FlaskConical } from 'lucide-react';
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
        <TabsList className="grid grid-cols-3 mb-8 bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm p-1 rounded-xl">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:backdrop-blur-md rounded-lg px-6 py-2.5 tab-highlight flex gap-2 items-center"
          >
            <Activity className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="comparison" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:backdrop-blur-md rounded-lg px-6 py-2.5 tab-highlight flex gap-2 items-center"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Comparison</span>
          </TabsTrigger>
          <TabsTrigger 
            value="scenarios" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:backdrop-blur-md rounded-lg px-6 py-2.5 tab-highlight flex gap-2 items-center"
          >
            <FlaskConical className="h-4 w-4" />
            <span>What If</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <motion.div 
              className="risk-gauge flex flex-col items-center justify-center relative p-8 rounded-2xl overflow-hidden min-w-[280px] glow-effect"
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
                className="mt-6 text-center w-full"
              >
                <span className="text-sm text-muted-foreground block mb-2">
                  Risk percentile among similar patients
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">0%</span>
                  <div className="relative h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-500 to-teal-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${riskScore * 100}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                  <span className="text-sm font-medium">100%</span>
                </div>
              </motion.div>
            </motion.div>
            
            <div className="space-y-6 max-w-md">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card-modern p-6"
              >
                <h3 className="text-lg font-medium mb-2 gradient-text">Risk Breakdown</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your risk score is influenced by several factors:
                </p>
                <ul className="space-y-4">
                  {patientData?.hasHeartDisease && (
                    <li>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Heart Disease</span>
                        <span className="text-xs font-medium text-muted-foreground">75%</span>
                      </div>
                      <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 to-rose-500"
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 0.7, delay: 0.5 }}
                        />
                      </div>
                    </li>
                  )}
                  {patientData?.hasDiabetes && (
                    <li>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Diabetes</span>
                        <span className="text-xs font-medium text-muted-foreground">60%</span>
                      </div>
                      <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-400 to-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ duration: 0.7, delay: 0.6 }}
                        />
                      </div>
                    </li>
                  )}
                  {patientData?.hasHypertension && (
                    <li>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Hypertension</span>
                        <span className="text-xs font-medium text-muted-foreground">55%</span>
                      </div>
                      <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-yellow-500"
                          initial={{ width: 0 }}
                          animate={{ width: '55%' }}
                          transition={{ duration: 0.7, delay: 0.7 }}
                        />
                      </div>
                    </li>
                  )}
                  <li>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Age ({patientData?.age || 'N/A'})</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {patientData?.age ? Math.min((patientData.age / 100) * 100, 100).toFixed(0) : 50}%
                      </span>
                    </div>
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-sky-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${patientData?.age ? Math.min((patientData.age / 100) * 100, 100) : 50}%` }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Previous Admissions ({patientData?.previousAdmissions || 0})</span>
                      <span className="text-xs font-medium text-muted-foreground">
                        {patientData?.previousAdmissions ? Math.min(patientData.previousAdmissions * 25, 100).toFixed(0) : 0}%
                      </span>
                    </div>
                    <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${patientData?.previousAdmissions ? Math.min(patientData.previousAdmissions * 25, 100) : 0}%` }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                      />
                    </div>
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
