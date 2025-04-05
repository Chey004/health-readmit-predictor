
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import { motion } from 'framer-motion';

interface FeatureImportanceChartProps {
  data: {
    name: string;
    importance: number;
  }[];
}

const FeatureImportanceChart = ({ data }: FeatureImportanceChartProps) => {
  // Sort data by importance
  const sortedData = [...data].sort((a, b) => b.importance - a.importance);
  const [animatedData, setAnimatedData] = useState(
    sortedData.map(item => ({ ...item, importance: 0 }))
  );
  
  useEffect(() => {
    // Animate the data points one by one with a slight delay
    const timer = setTimeout(() => {
      setAnimatedData(sortedData);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [sortedData]);
  
  return (
    <div className="w-full h-full min-h-[400px] px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={animatedData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis 
            type="number" 
            domain={[0, Math.max(...data.map(d => d.importance)) * 1.1]} 
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
          />
          <YAxis 
            type="category" 
            dataKey="name" 
            width={150}
            tick={{ 
              fontSize: 13, 
              fontWeight: 'medium',
              fill: '#666'
            }} 
          />
          <Tooltip
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar 
            dataKey="importance" 
            minPointSize={3}
            radius={[0, 4, 4, 0]}
            barSize={30}
            animationDuration={1200}
            animationBegin={300}
            animationEasing="ease-out"
          >
            {animatedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`hsl(${210 - (index * 15)}, 85%, ${65 - (index * 3)}%)`}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={1}
              />
            ))}
            <LabelList 
              dataKey="importance" 
              position="right" 
              formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
              style={{ 
                fill: '#444', 
                fontWeight: 'bold',
                fontSize: 12,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)'
              }} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportanceChart;
