
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PatientForm from '@/components/PatientForm';
import RiskDisplay from '@/components/RiskDisplay';
import DataTable from '@/components/DataTable';
import FeatureImportance from '@/components/FeatureImportance';
import InfoCard from '@/components/InfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { samplePatients, riskFactors } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Index = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleCalculateRisk = (score: number) => {
    setIsLoading(true);
    
    // Simulate calculation delay to provide better UX feedback
    setTimeout(() => {
      setRiskScore(score);
      setIsLoading(false);
      setActiveTab('risk');
      
      toast({
        title: "Risk Assessment Complete",
        description: `Patient risk score: ${Math.round(score * 100)}%`,
        variant: score > 0.7 ? "destructive" : "default",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <Header />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 container mx-auto px-4 py-6"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <motion.div 
            className="flex justify-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TabsList className="mb-4 bg-white/70 backdrop-blur-md shadow-lg border border-slate-100">
              <TabsTrigger 
                value="calculator"
                className="relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary data-[state=active]:after:animate-pulse"
              >
                Risk Calculator
              </TabsTrigger>
              <TabsTrigger 
                value="risk" 
                disabled={riskScore === null}
                className="relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary data-[state=active]:after:animate-pulse"
              >
                Risk Assessment
              </TabsTrigger>
              <TabsTrigger 
                value="data"
                className="relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary data-[state=active]:after:animate-pulse"
              >
                Patient Data
              </TabsTrigger>
              <TabsTrigger 
                value="model"
                className="relative data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=active]:after:bg-primary data-[state=active]:after:animate-pulse"
              >
                Model Insights
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div 
                className="lg:col-span-2"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <InfoCard 
                  title="Readmission Risk Calculator" 
                  description="Enter patient data to predict 30-day readmission risk"
                >
                  <PatientForm onCalculateRisk={handleCalculateRisk} />
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-b-lg z-10"
                    >
                      <div className="flex flex-col items-center">
                        <motion.div 
                          animate={{ 
                            rotate: 360,
                            boxShadow: ["0 0 5px #38bdf8", "0 0 15px #38bdf8", "0 0 5px #38bdf8"]
                          }}
                          transition={{ 
                            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                            boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                          }} 
                          className="rounded-full h-12 w-12 border-2 border-primary border-t-transparent mb-3"
                        />
                        <p className="text-primary font-medium">Analyzing patient data...</p>
                      </div>
                    </motion.div>
                  )}
                </InfoCard>
              </motion.div>
              
              <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <InfoCard 
                  title="About This Model" 
                  description="How predictions are generated"
                >
                  <div className="text-sm text-muted-foreground">
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/60 rounded-md mb-3 border border-blue-200/50 shadow-sm">
                      <p className="mb-3 font-medium text-blue-800">
                        This tool predicts the risk of a patient being readmitted within 30 days
                        of discharge, based on clinical and demographic variables.
                      </p>
                      <p className="mb-3">
                        The model was trained on historical patient data including medical history,
                        lab results, demographic information, and prior hospitalizations.
                      </p>
                      <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md border border-blue-100 shadow-inner">
                        <p className="font-medium mb-1 text-gray-700">Key predictors include:</p>
                        <ul className="pl-5 list-disc text-sm space-y-2">
                          <li className="hover:text-blue-700 transition-colors">Age and gender</li>
                          <li className="hover:text-blue-700 transition-colors">Previous hospital admissions</li>
                          <li className="hover:text-blue-700 transition-colors">Length of stay</li>
                          <li className="hover:text-blue-700 transition-colors">Comorbidities</li>
                          <li className="hover:text-blue-700 transition-colors">Disease-specific indicators (HbA1c, LVEF)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </InfoCard>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            {riskScore !== null && (
              <motion.div 
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <InfoCard 
                  title="Readmission Risk Assessment" 
                  description="Patient's 30-day readmission risk prediction"
                >
                  <RiskDisplay riskScore={riskScore} />
                </InfoCard>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <InfoCard 
                title="Recent Patient Assessments" 
                description="Historical risk assessments for comparison"
              >
                <DataTable patients={samplePatients} />
              </InfoCard>
            </motion.div>
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <InfoCard 
                  title="Feature Importance" 
                  description="Relative importance of predictive factors"
                >
                  <div className="h-[400px] w-full p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-inner border border-slate-100">
                    <FeatureImportance data={riskFactors} />
                  </div>
                </InfoCard>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <InfoCard 
                  title="Model Information" 
                  description="Technical details about the prediction model"
                >
                  <div className="space-y-4 p-3">
                    <motion.div 
                      className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm"
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-semibold text-blue-800">Algorithm</p>
                      <p className="text-sm">Gradient Boosted Decision Trees (XGBoost)</p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 shadow-sm"
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.1), 0 8px 10px -6px rgba(147, 51, 234, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-semibold text-purple-800">Training Data</p>
                      <p className="text-sm">50,000 patient records from Medicare Claims and MIMIC-III</p>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200 shadow-sm"
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 8px 10px -6px rgba(16, 185, 129, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-semibold text-emerald-800">Performance Metrics</p>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md text-center shadow-sm border border-emerald-100">
                          <p className="text-xs text-gray-500">AUC-ROC</p>
                          <p className="font-bold text-emerald-600">0.82</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md text-center shadow-sm border border-emerald-100">
                          <p className="text-xs text-gray-500">Sensitivity</p>
                          <p className="font-bold text-emerald-600">0.76</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md text-center shadow-sm border border-emerald-100">
                          <p className="text-xs text-gray-500">Specificity</p>
                          <p className="font-bold text-emerald-600">0.79</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-3 rounded-md text-center shadow-sm border border-emerald-100">
                          <p className="text-xs text-gray-500">PPV</p>
                          <p className="font-bold text-emerald-600">0.68</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 text-center shadow-sm"
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(100, 116, 139, 0.1), 0 8px 10px -6px rgba(100, 116, 139, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-semibold text-slate-700">Last Updated</p>
                      <p className="text-sm">June 2023</p>
                    </motion.div>
                  </div>
                </InfoCard>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.main>
      
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-medical-800 to-medical-700 text-white py-5 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
      >
        <div className="container mx-auto text-center text-sm">
          <p>Hospital Readmission Risk Predictor | Disclaimer: For educational purposes only</p>
          <p className="mt-1 text-medical-200">This tool does not provide medical advice and is not a substitute for professional medical judgment.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
