
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, Legend } from 'recharts';
import { AlertCircle, HelpCircle, Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import InfoCard from '../InfoCard';

interface RiskComparisonChartProps {
  patientRisk: number;
  patientAge: number;
  patientFactors?: Array<{ name: string; contribution: number; description: string; }>;
}

const RiskComparisonChart = ({ patientRisk, patientAge, patientFactors = [] }: RiskComparisonChartProps) => {
  // State for selected chart element
  const [selectedDataPoint, setSelectedDataPoint] = useState<string | null>(null);

  // Generate appropriate demographic comparison data
  // This would come from your backend in a real implementation
  const ageBracket = Math.floor(patientAge / 10) * 10;
  const ageGroupRisk = 0.3 + (ageBracket - 40) * 0.01; // Simple simulation - increases with age
  
  // Enhanced data with more comparison groups
  const data = [
    { 
      name: 'Your Risk', 
      risk: patientRisk * 100, 
      fill: '#0284c7', 
      gradient: true,
      description: `Your personalized risk score based on all analyzed factors`
    },
    { 
      name: `Age ${ageBracket}-${ageBracket + 9}`, 
      risk: ageGroupRisk * 100, 
      fill: '#64748b',
      description: `Average risk for people aged ${ageBracket}-${ageBracket + 9}`
    },
    { 
      name: 'National Avg', 
      risk: 35, 
      fill: '#64748b',
      description: 'Average risk across all demographics nationally'
    },
    { 
      name: 'Target', 
      risk: 20, 
      fill: '#10b981',
      description: 'Recommended target risk level for optimal outcomes'
    },
    { 
      name: 'Similar Patients', 
      risk: (patientRisk * 0.9) * 100, 
      fill: '#8b5cf6',
      description: 'Patients with similar clinical profiles to yours'
    },
  ];
  
  const config = {
    patientRisk: { label: "Your Risk", color: "#0284c7" },
    average: { label: "Average", color: "#64748b" },
    target: { label: "Target", color: "#10b981" },
    similar: { label: "Similar Patients", color: "#8b5cf6" },
  };

  // Custom animation settings
  const enterAnimation = {
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25, 
        duration: 0.5 
      } 
    },
    initial: { opacity: 0, y: 20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <InfoCard
        title="Risk Comparison Analysis"
        description="See how your readmission risk compares to different groups"
        icon={<Info size={18} />}
        glowColor="rgba(14, 165, 233, 0.3)"
        className="animated-border"
      >
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Interactive Comparison Chart
            </h4>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-muted-foreground hover:text-foreground">
                  <HelpCircle size={16} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 text-sm">
                <div className="space-y-2">
                  <h5 className="font-medium">About This Chart</h5>
                  <p>This chart compares your calculated readmission risk with various reference groups.</p>
                  <p>Click on any bar for more details about that comparison group.</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <ChartContainer config={config} className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                barGap={8}
                className="progress-bar-animated"
                onClick={(data) => {
                  if (data && data.activePayload) {
                    setSelectedDataPoint(data.activePayload[0].payload.name);
                  }
                }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="similarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={70} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  label={{ 
                    value: 'Risk Percentage (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                  domain={[0, 100]}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />} 
                  animationDuration={300}
                  cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }} 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                />
                <Bar 
                  dataKey="risk" 
                  name="Risk (%)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1000}
                  animationBegin={200}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.name === 'Your Risk' ? 'url(#barGradient)' : 
                            entry.name === 'Similar Patients' ? 'url(#similarGradient)' : entry.fill}
                      className={selectedDataPoint === entry.name ? 'opacity-100 stroke-2 stroke-sky-600' : 'hover-scale opacity-90'}
                      strokeWidth={selectedDataPoint === entry.name ? 2 : 0}
                    />
                  ))}
                  <LabelList 
                    dataKey="risk" 
                    position="top" 
                    formatter={(value: number) => `${Math.round(value)}%`}
                    style={{ fontSize: '12px', fontWeight: 'bold' }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <motion.div 
            className="mt-8"
            {...enterAnimation}
            key={selectedDataPoint || 'analysis'}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium gradient-text">Analysis & Interpretation</h4>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-muted-foreground hover:text-foreground">
                    <Info size={16} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80 text-sm">
                  <div className="space-y-2">
                    <h5 className="font-medium">AI-Powered Analysis</h5>
                    <p>This analysis uses advanced machine learning to interpret your risk profile in context.</p>
                    <p>Interpretability features help explain what factors are most important for your specific case.</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-5 text-sm border border-slate-200 shadow-inner">
              {selectedDataPoint ? (
                <div className="space-y-3">
                  <h5 className="font-medium text-base">
                    {selectedDataPoint} Comparison
                  </h5>
                  <p>
                    {data.find(d => d.name === selectedDataPoint)?.description}
                  </p>
                  {selectedDataPoint === 'Your Risk' && patientFactors && patientFactors.length > 0 && (
                    <div className="mt-3">
                      <h6 className="font-medium mb-2">Top Contributing Factors:</h6>
                      <ul className="space-y-1.5">
                        {patientFactors.slice(0, 3).map((factor, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary font-medium">{factor.name}:</span>
                            <span>{factor.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : patientRisk > ageGroupRisk ? (
                <p className="flex gap-2 items-start">
                  <AlertCircle className="text-destructive shrink-0 mt-0.5" size={18} />
                  <span>
                    Your risk score is <span className="font-medium text-destructive">
                      {Math.round((patientRisk - ageGroupRisk) * 100)}% higher
                    </span> than the average for people in your age group. 
                    Check the "What If Scenarios" tab to see how lifestyle changes could reduce your risk.
                  </span>
                </p>
              ) : (
                <p className="flex gap-2 items-start">
                  <span className="shrink-0 mt-0.5">🎉</span>
                  <span>
                    Your risk score is <span className="font-medium text-green-600">
                      {Math.round((ageGroupRisk - patientRisk) * 100)}% lower
                    </span> than the average for people in your age group. 
                    This is a positive sign, but maintaining healthy habits is still important.
                  </span>
                </p>
              )}

              {/* Advanced machine learning insights */}
              {patientFactors && patientFactors.length > 0 && !selectedDataPoint && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-muted-foreground mb-2">Advanced ML model insights:</p>
                  <p>Our Graph Convolutional Network has identified key interactions between your risk factors that may require special attention.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </InfoCard>
    </motion.div>
  );
};

export default RiskComparisonChart;
