
import React from 'react';
import { motion } from 'framer-motion';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
    { name: 'Your Risk', risk: patientRisk * 100, fill: '#0284c7' },
    { name: `Age Group (${ageBracket}-${ageBracket + 9})`, risk: ageGroupRisk * 100, fill: '#64748b' },
    { name: 'National Average', risk: 35, fill: '#64748b' },
    { name: 'Low Risk Target', risk: 20, fill: '#10b981' },
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
      className="bg-card rounded-lg p-6 border shadow-sm"
    >
      <h3 className="text-xl font-medium mb-2">Risk Comparison</h3>
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
          >
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
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <div className="mt-8">
        <h4 className="font-medium mb-3">Analysis</h4>
        <div className="bg-muted/30 rounded-md p-4 text-sm">
          {patientRisk > ageGroupRisk ? (
            <p>
              Your risk score is <span className="font-medium text-destructive">
                {Math.round((patientRisk - ageGroupRisk) * 100)}% higher
              </span> than the average for people in your age group. 
              Check the "What If Scenarios" tab to see how lifestyle changes could reduce your risk.
            </p>
          ) : (
            <p>
              Your risk score is <span className="font-medium text-green-600">
                {Math.round((ageGroupRisk - patientRisk) * 100)}% lower
              </span> than the average for people in your age group. 
              This is a positive sign, but maintaining healthy habits is still important.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RiskComparisonChart;
