
import React from 'react';
import { Activity, AlertCircle, BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-medical-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3 mb-3 md:mb-0">
          <Activity className="h-8 w-8 text-accent-400" />
          <h1 className="text-2xl font-bold">Hospital Readmission Risk Predictor</h1>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 hover:text-accent-300 transition-colors">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </button>
          <button className="flex items-center gap-2 hover:text-accent-300 transition-colors">
            <AlertCircle className="h-5 w-5" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
