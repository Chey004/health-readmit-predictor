
import React, { useState } from 'react';
import Header from '@/components/Header';
import PatientForm from '@/components/PatientForm';
import RiskDisplay from '@/components/RiskDisplay';
import DataTable from '@/components/DataTable';
import FeatureImportance from '@/components/FeatureImportance';
import InfoCard from '@/components/InfoCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { samplePatients, riskFactors } from '@/data/sampleData';

const Index = () => {
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleCalculateRisk = (score: number) => {
    setRiskScore(score);
    // Switch to the risk tab automatically when we calculate a new risk
    setActiveTab('risk');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="mb-4">
              <TabsTrigger value="calculator">Risk Calculator</TabsTrigger>
              <TabsTrigger value="risk" disabled={riskScore === null}>Risk Assessment</TabsTrigger>
              <TabsTrigger value="data">Patient Data</TabsTrigger>
              <TabsTrigger value="model">Model Insights</TabsTrigger>
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
                </InfoCard>
              </div>
              
              <div>
                <InfoCard 
                  title="About This Model" 
                  description="How predictions are generated"
                >
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      This tool predicts the risk of a patient being readmitted within 30 days
                      of discharge, based on clinical and demographic variables.
                    </p>
                    <p className="mb-3">
                      The model was trained on historical patient data including medical history,
                      lab results, demographic information, and prior hospitalizations.
                    </p>
                    <p>
                      Key predictors include age, previous admissions, length of stay,
                      comorbidities, and disease-specific indicators like HbA1c for diabetes
                      and LVEF for heart failure.
                    </p>
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
                  <div className="h-[400px] w-full">
                    <FeatureImportance data={riskFactors} />
                  </div>
                </InfoCard>
              </div>
              
              <div>
                <InfoCard 
                  title="Model Information" 
                  description="Technical details about the prediction model"
                >
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-3">
                      <span className="font-semibold">Algorithm:</span> Gradient Boosted Decision Trees (XGBoost)
                    </p>
                    <p className="mb-3">
                      <span className="font-semibold">Training Data:</span> 50,000 patient records from Medicare Claims and MIMIC-III
                    </p>
                    <p className="mb-3">
                      <span className="font-semibold">Performance Metrics:</span>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>AUC-ROC: 0.82</li>
                        <li>Sensitivity: 0.76</li>
                        <li>Specificity: 0.79</li>
                        <li>PPV: 0.68</li>
                      </ul>
                    </p>
                    <p>
                      <span className="font-semibold">Last Updated:</span> June 2023
                    </p>
                  </div>
                </InfoCard>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-medical-800 text-white py-4 px-6">
        <div className="container mx-auto text-center text-sm">
          <p>Hospital Readmission Risk Predictor | Disclaimer: For educational purposes only</p>
          <p className="mt-1 text-medical-200">This tool does not provide medical advice and is not a substitute for professional medical judgment.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
