
import React from 'react';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { AlertCircle } from 'lucide-react';

interface RiskComparisonChartProps {
  patientRisk: number;
  patientAge: number;
}

const RiskComparisonChart = ({ patientRisk, patientAge }: RiskComparisonChartProps) => {
  // Generate appropriate demographic comparison data
  // This would come from your backend in a real implementation
  const ageBracket = Math.floor(patientAge / 10) * 10;
  const ageGroupRisk = 0.3 + (ageBracket - 40) * 0.01; // Simple simulation - increases with age
  
  const data = [
    { name: 'Your Risk', risk: patientRisk * 100, fill: '#0284c7', gradient: true },
    { name: `Age ${ageBracket}-${ageBracket + 9}`, risk: ageGroupRisk * 100, fill: '#64748b' },
    { name: 'National Avg', risk: 35, fill: '#64748b' },
    { name: 'Target', risk: 20, fill: '#10b981' },
  ];
  
  const config = {
    patientRisk: { label: "Your Risk", color: "#0284c7" },
    average: { label: "Average", color: "#64748b" },
    target: { label: "Target", color: "#10b981" },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card-modern p-6 animated-gradient-bg"
    >
      <h3 className="text-xl font-medium mb-2 gradient-text">Risk Comparison</h3>
      <p className="text-sm text-muted-foreground mb-6">
        See how your readmission risk compares to different groups
      </p>
      
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
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#14b8a6" />
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
            />
            <Bar 
              dataKey="risk" 
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.gradient ? 'url(#barGradient)' : entry.fill}
                  className="hover-scale"
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-medium mb-3 gradient-text">Analysis</h4>
        <div className="bg-muted/30 backdrop-blur-sm rounded-lg p-5 text-sm border border-slate-200 shadow-inner">
          {patientRisk > ageGroupRisk ? (
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RiskComparisonChart;
