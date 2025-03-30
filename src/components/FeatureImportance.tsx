
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface FeatureImportanceProps {
  data: {
    name: string;
    importance: number;
  }[];
}

const FeatureImportance = ({ data }: FeatureImportanceProps) => {
  // Sort data by importance
  const sortedData = [...data].sort((a, b) => b.importance - a.importance);

  return (
    <div className="w-full h-full min-h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, Math.max(...data.map(d => d.importance)) * 1.1]} />
          <YAxis type="category" dataKey="name" width={120} />
          <Tooltip
            formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />
          <Bar dataKey="importance" minPointSize={3}>
            {sortedData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={`hsl(${210 - (index * 15)}, 80%, 55%)`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeatureImportance;
