
export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  diagnosis: string;
  lengthOfStay: number;
  previousAdmissions: number;
  hasHypertension: boolean;
  hasDiabetes: boolean;
  hasHeartDisease: boolean;
  hasCOPD: boolean;
  hasAsthma: boolean;
  hasKidneyDisease: boolean;
  hasLiverDisease: boolean;
  hasCancer: boolean;
  hasStroke: boolean;
  medicationCount: number;
  bmi: number;
  hba1c?: number;
  egfr?: number;
  lvef?: number;
  riskScore: number;
  // New PROM fields
  selfReportedHealth?: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
  painLevel?: number; // 0-10 scale
  mobilityScore?: number; // 0-10 scale
  livesAlone?: boolean;
  transportationIssues?: boolean;
  // For scenario simulation
  exerciseHours?: number;
  quitSmoking?: boolean;
};

export const samplePatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 67,
    gender: 'Male',
    diagnosis: 'Heart Failure',
    lengthOfStay: 5,
    previousAdmissions: 2,
    hasHypertension: true,
    hasDiabetes: true,
    hasHeartDisease: true,
    hasCOPD: false,
    hasAsthma: false,
    hasKidneyDisease: false,
    hasLiverDisease: false,
    hasCancer: false,
    hasStroke: false,
    medicationCount: 7,
    bmi: 29.4,
    lvef: 35,
    riskScore: 0.72
  },
  {
    id: 'P002',
    name: 'Mary Johnson',
    age: 62,
    gender: 'Female',
    diagnosis: 'Diabetes Type 2',
    lengthOfStay: 3,
    previousAdmissions: 1,
    hasHypertension: true,
    hasDiabetes: true,
    hasHeartDisease: false,
    hasCOPD: false,
    hasAsthma: false,
    hasKidneyDisease: true,
    hasLiverDisease: false,
    hasCancer: false,
    hasStroke: false,
    medicationCount: 5,
    bmi: 31.2,
    hba1c: 8.1,
    riskScore: 0.45
  },
  {
    id: 'P003',
    name: 'Robert Davis',
    age: 78,
    gender: 'Male',
    diagnosis: 'COPD',
    lengthOfStay: 8,
    previousAdmissions: 3,
    hasHypertension: true,
    hasDiabetes: false,
    hasHeartDisease: true,
    hasCOPD: true,
    hasAsthma: false,
    hasKidneyDisease: false,
    hasLiverDisease: false,
    hasCancer: false,
    hasStroke: true,
    medicationCount: 6,
    bmi: 24.8,
    egfr: 45,
    riskScore: 0.83
  },
  {
    id: 'P004',
    name: 'Sarah Williams',
    age: 54,
    gender: 'Female',
    diagnosis: 'Diabetes Type 1',
    lengthOfStay: 2,
    previousAdmissions: 0,
    hasHypertension: false,
    hasDiabetes: true,
    hasHeartDisease: false,
    hasCOPD: false,
    hasAsthma: true,
    hasKidneyDisease: false,
    hasLiverDisease: false,
    hasCancer: false,
    hasStroke: false,
    medicationCount: 3,
    bmi: 26.1,
    hba1c: 7.2,
    riskScore: 0.29
  },
  {
    id: 'P005',
    name: 'James Brown',
    age: 71,
    gender: 'Male',
    diagnosis: 'Heart Failure',
    lengthOfStay: 6,
    previousAdmissions: 2,
    hasHypertension: true,
    hasDiabetes: true,
    hasHeartDisease: true,
    hasCOPD: false,
    hasAsthma: false,
    hasKidneyDisease: true,
    hasLiverDisease: false,
    hasCancer: false,
    hasStroke: false,
    medicationCount: 8,
    bmi: 32.5,
    lvef: 30,
    riskScore: 0.78
  }
];

export const riskFactors = [
  { name: 'Age', importance: 0.15 },
  { name: 'Previous Admissions', importance: 0.21 },
  { name: 'Length of Stay', importance: 0.12 },
  { name: 'Medication Count', importance: 0.09 },
  { name: 'HbA1c', importance: 0.13 },
  { name: 'Hypertension', importance: 0.08 },
  { name: 'Heart Disease', importance: 0.14 },
  { name: 'BMI', importance: 0.08 }
];
