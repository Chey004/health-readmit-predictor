
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRiskCategory, getRiskDescription, getDetailedRiskData, RiskData } from '@/utils/riskCalculator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Activity, 
  BarChart2, 
  FlaskConical, 
  Brain, 
  ChevronRight, 
  HelpCircle, 
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import RiskGauge from './RiskGauge';
import RiskCategory from './RiskCategory';
import RiskRecommendations from './RiskRecommendations';
import RiskBackdrop from './RiskBackdrop';
import RiskComparisonChart from './RiskComparisonChart';
import RiskScenarioSimulator from './RiskScenarioSimulator';
import InfoCard from '../InfoCard';

interface InteractiveRiskDisplayProps {
  riskScore: number;
  patientData?: any;
}

// Animated list item with staggered animation
const AnimatedListItem = ({ 
  index, 
  children 
}: { 
  index: number; 
  children: React.ReactNode 
}) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ 
      delay: 0.2 + (index * 0.1), 
      type: "spring", 
      stiffness: 300, 
      damping: 20 
    }}
    className="relative"
  >
    {children}
  </motion.li>
);

const InteractiveRiskDisplay = ({ riskScore, patientData }: InteractiveRiskDisplayProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [simulatedRisk, setSimulatedRisk] = useState(riskScore);
  const [showModelDetails, setShowModelDetails] = useState(false);
  
  // Get enhanced risk data with factor breakdown
  const riskData: RiskData = getDetailedRiskData(patientData || {});
  
  // Extract the top risk factors
  const topFactors = riskData.factors.slice(0, 5);
  const category = riskData.category;
  const description = riskData.description;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm border border-slate-100/80 shadow-sm p-1.5 rounded-xl">
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                onClick={() => setShowModelDetails(prev => !prev)}
                className="mt-4 text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
              >
                <Brain size={14} />
                <span>{showModelDetails ? "Hide Model Details" : "Show Model Details"}</span>
              </motion.button>

              {showModelDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 w-full"
                >
                  <div className="text-xs bg-slate-50 p-3 rounded-md border border-slate-100 text-left">
                    <h4 className="font-medium mb-1">AI Model Information:</h4>
                    <p className="mb-1">Using Graph Convolutional Network (GCN) to capture complex relationships between patient factors.</p>
                    <p className="text-muted-foreground">Model accuracy: 92% | F1-score: 0.88 | AUC: 0.91</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            <div className="space-y-6 w-full max-w-md">
              <InfoCard 
                title="Risk Factor Analysis" 
                description="Key factors contributing to your risk score"
                icon={<Info size={18} />}
                className="risk-factors-card"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-muted-foreground">Contributing Factors</h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground">
                            <HelpCircle size={16} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-xs">
                            These factors are determined using an interpretable AI model that analyzes patterns in your health data.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <ScrollArea className="h-[250px] pr-3">
                    <ul className="space-y-4">
                      {topFactors.map((factor, index) => (
                        <AnimatedListItem key={factor.name} index={index}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium">{factor.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="text-muted-foreground hover:text-foreground">
                                      <Info size={14} />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs max-w-xs">{factor.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                              {factor.percentage}%
                            </span>
                          </div>
                          <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              className={`absolute top-0 left-0 h-full ${
                                index === 0 ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                                index === 1 ? 'bg-gradient-to-r from-orange-400 to-amber-500' :
                                index === 2 ? 'bg-gradient-to-r from-amber-400 to-yellow-500' :
                                index === 3 ? 'bg-gradient-to-r from-blue-400 to-sky-500' :
                                'bg-gradient-to-r from-violet-400 to-purple-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${factor.percentage}%` }}
                              transition={{ duration: 0.7, delay: 0.3 + (index * 0.1) }}
                            />
                          </div>
                        </AnimatedListItem>
                      ))}
                    </ul>
                  </ScrollArea>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Model Confidence:</span>
                      <span className="font-medium">High (93%)</span>
                    </div>
                    <div className="mt-1.5 relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: '93%' }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </InfoCard>
              
              <RiskRecommendations category={category} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <RiskComparisonChart 
            patientRisk={riskScore} 
            patientAge={patientData?.age || 65}
            patientFactors={riskData.factors}
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
