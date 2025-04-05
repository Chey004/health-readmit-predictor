
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import PatientForm from '@/components/PatientForm';
import RiskDisplay from '@/components/RiskDisplay';
import DataTable from '@/components/DataTable';
import FeatureImportance from '@/components/FeatureImportance';
import InfoCard from '@/components/InfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { samplePatients, riskFactors } from '@/data/sampleData';
import { useToast } from '@/components/ui/use-toast';

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
        variant: score > 0.7 ? "destructive" : score > 0.3 ? "default" : "success",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="mb-4">
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
          </div>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InfoCard 
                  title="Readmission Risk Calculator" 
                  description="Enter patient data to predict 30-day readmission risk"
                >
                  <PatientForm onCalculateRisk={handleCalculateRisk} />
                  {isLoading && (
                    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center rounded-b-lg z-10">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-3"></div>
                        <p className="text-primary font-medium">Analyzing patient data...</p>
                      </div>
                    </div>
                  )}
                </InfoCard>
              </div>
              
              <div>
                <InfoCard 
                  title="About This Model" 
                  description="How predictions are generated"
                >
                  <div className="text-sm text-muted-foreground">
                    <div className="p-3 bg-blue-50 rounded-md mb-3 border border-blue-100">
                      <p className="mb-3 font-medium text-blue-800">
                        This tool predicts the risk of a patient being readmitted within 30 days
                        of discharge, based on clinical and demographic variables.
                      </p>
                      <p className="mb-3">
                        The model was trained on historical patient data including medical history,
                        lab results, demographic information, and prior hospitalizations.
                      </p>
                      <div className="bg-white p-2 rounded border border-blue-100">
                        <p className="font-medium mb-1 text-gray-700">Key predictors include:</p>
                        <ul className="pl-5 list-disc text-sm space-y-1">
                          <li>Age and gender</li>
                          <li>Previous hospital admissions</li>
                          <li>Length of stay</li>
                          <li>Comorbidities</li>
                          <li>Disease-specific indicators (HbA1c, LVEF)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            {riskScore !== null && (
              <div className="grid grid-cols-1 gap-6">
                <InfoCard 
                  title="Readmission Risk Assessment" 
                  description="Patient's 30-day readmission risk prediction"
                >
                  <RiskDisplay riskScore={riskScore} />
                </InfoCard>
              </div>
            )}
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <InfoCard 
              title="Recent Patient Assessments" 
              description="Historical risk assessments for comparison"
            >
              <DataTable patients={samplePatients} />
            </InfoCard>
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InfoCard 
                  title="Feature Importance" 
                  description="Relative importance of predictive factors"
                >
                  <div className="h-[400px] w-full p-2 bg-white/70 rounded-lg">
                    <FeatureImportance data={riskFactors} />
                  </div>
                </InfoCard>
              </div>
              
              <div>
                <InfoCard 
                  title="Model Information" 
                  description="Technical details about the prediction model"
                >
                  <div className="space-y-3 p-2">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="font-semibold text-blue-800">Algorithm</p>
                      <p className="text-sm">Gradient Boosted Decision Trees (XGBoost)</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                      <p className="font-semibold text-purple-800">Training Data</p>
                      <p className="text-sm">50,000 patient records from Medicare Claims and MIMIC-III</p>
                    </div>
                    
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                      <p className="font-semibold text-emerald-800">Performance Metrics</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-white p-2 rounded text-center">
                          <p className="text-xs text-gray-500">AUC-ROC</p>
                          <p className="font-bold text-emerald-600">0.82</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="text-xs text-gray-500">Sensitivity</p>
                          <p className="font-bold text-emerald-600">0.76</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="text-xs text-gray-500">Specificity</p>
                          <p className="font-bold text-emerald-600">0.79</p>
                        </div>
                        <div className="bg-white p-2 rounded text-center">
                          <p className="text-xs text-gray-500">PPV</p>
                          <p className="font-bold text-emerald-600">0.68</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                      <p className="font-semibold text-gray-700">Last Updated</p>
                      <p className="text-sm">June 2023</p>
                    </div>
                  </div>
                </InfoCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gradient-to-r from-medical-800 to-medical-700 text-white py-4 px-6">
        <div className="container mx-auto text-center text-sm">
          <p>Hospital Readmission Risk Predictor | Disclaimer: For educational purposes only</p>
          <p className="mt-1 text-medical-200">This tool does not provide medical advice and is not a substitute for professional medical judgment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
