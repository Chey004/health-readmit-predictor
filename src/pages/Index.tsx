import React, { useState } from 'react';
import Header from '@/components/Header';
import PatientForm from '@/components/PatientForm';
import InteractiveRiskDisplay from '@/components/risk/InteractiveRiskDisplay';
import FeatureImportanceChart from '@/components/FeatureImportanceChart';
import ModelMetricsCard from '@/components/ModelMetricsCard';
import ModelBadge from '@/components/ModelBadge';
import InfoCard from '@/components/InfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { samplePatients, riskFactors } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Index = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);
  const { toast } = useToast();
  
  const handleCalculateRisk = (score: number, data: any) => {
    setIsLoading(true);
    setPatientData(data);
    
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
                  <InteractiveRiskDisplay riskScore={riskScore} patientData={patientData} />
                </InfoCard>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Model Insights & Performance
              </h2>
              <p className="text-slate-600 mt-2">Explore the machine learning model driving predictions</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <InfoCard 
                  title="Feature Importance" 
                  description="The relative impact of each factor on readmission risk prediction"
                  className="overflow-visible"
                >
                  <div className="h-[450px] w-full p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-inner border border-slate-100">
                    <FeatureImportanceChart data={riskFactors} />
                  </div>
                </InfoCard>
              </motion.div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <motion.div
                  className="lg:col-span-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <InfoCard 
                    title="Model Performance" 
                    description="Key metrics measuring predictive accuracy"
                  >
                    <div className="p-4">
                      <ModelMetricsCard />
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Interpret These Metrics</h3>
                      <ul className="space-y-3 text-sm">
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-2 mt-0.5 font-bold">1</div>
                          <p><span className="font-semibold">AUC-ROC (0.82):</span> The model can correctly distinguish between readmission and non-readmission cases 82% of the time.</p>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mr-2 mt-0.5 font-bold">2</div>
                          <p><span className="font-semibold">Sensitivity (0.76):</span> The model correctly identifies 76% of patients who will be readmitted.</p>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-2 mt-0.5 font-bold">3</div>
                          <p><span className="font-semibold">Specificity (0.79):</span> The model correctly identifies 79% of patients who will not be readmitted.</p>
                        </motion.li>
                        <motion.li 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <div className="h-6 w-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mr-2 mt-0.5 font-bold">4</div>
                          <p><span className="font-semibold">PPV (0.68):</span> When the model predicts readmission, it's correct 68% of the time.</p>
                        </motion.li>
                      </ul>
                    </div>
                  </InfoCard>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <InfoCard 
                    title="Model Information" 
                    description="Technical details"
                    className="h-full"
                  >
                    <ModelBadge />
                    
                    <motion.div 
                      className="mt-4 bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-lg border border-slate-200 text-center"
                      whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(100, 116, 139, 0.1), 0 8px 10px -6px rgba(100, 116, 139, 0.1)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="font-semibold text-slate-700">Training Dataset</p>
                      <p className="text-sm mt-1">50,000 patient records from Medicare Claims and MIMIC-III</p>
                    </motion.div>
                  </InfoCard>
                </motion.div>
              </div>
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
