
import { Patient } from "@/data/sampleData";

// This is a simplified risk calculation model
// In a real-world scenario, this would be based on a trained ML model
export function calculateRiskScore(patientData: Partial<Patient>): number {
  // Base risk starts at 0.1 (10%)
  let riskScore = 0.1;
  
  // Age factor (older patients have higher risk)
  if (patientData.age) {
    if (patientData.age > 75) riskScore += 0.15;
    else if (patientData.age > 65) riskScore += 0.1;
    else if (patientData.age > 55) riskScore += 0.05;
  }
  
  // Previous admissions (strong predictor)
  if (patientData.previousAdmissions !== undefined) {
    riskScore += patientData.previousAdmissions * 0.07;
  }
  
  // Length of stay (longer stays indicate more complex cases)
  if (patientData.lengthOfStay) {
    if (patientData.lengthOfStay > 7) riskScore += 0.15;
    else if (patientData.lengthOfStay > 4) riskScore += 0.08;
    else if (patientData.lengthOfStay > 2) riskScore += 0.04;
  }
  
  // Comorbidities
  if (patientData.hasHypertension) riskScore += 0.05;
  if (patientData.hasDiabetes) riskScore += 0.07;
  if (patientData.hasHeartDisease) riskScore += 0.12;
  
  // Medication burden (polypharmacy)
  if (patientData.medicationCount) {
    if (patientData.medicationCount > 8) riskScore += 0.1;
    else if (patientData.medicationCount > 5) riskScore += 0.05;
    else if (patientData.medicationCount > 3) riskScore += 0.03;
  }
  
  // Disease-specific indicators
  if (patientData.hba1c && patientData.hba1c > 7.5) riskScore += 0.08;
  if (patientData.egfr && patientData.egfr < 60) riskScore += 0.1;
  if (patientData.lvef && patientData.lvef < 40) riskScore += 0.15;
  
  // BMI (both high and low can be risk factors)
  if (patientData.bmi) {
    if (patientData.bmi > 30) riskScore += 0.05;
    else if (patientData.bmi < 18.5) riskScore += 0.07;
  }
  
  // Cap the maximum risk at 0.95 (95%)
  return Math.min(Math.round(riskScore * 100) / 100, 0.95);
}

export function getRiskCategory(score: number): "low" | "medium" | "high" {
  if (score < 0.3) return "low";
  if (score < 0.6) return "medium";
  return "high";
}

export function getRiskDescription(score: number): string {
  const category = getRiskCategory(score);
  const percentage = Math.round(score * 100);
  
  switch (category) {
    case "low":
      return `${percentage}% - Low risk of readmission. Routine follow-up recommended.`;
    case "medium":
      return `${percentage}% - Moderate risk of readmission. Consider enhanced follow-up and care coordination.`;
    case "high":
      return `${percentage}% - High risk of readmission. Intensive follow-up, care coordination, and potential intervention needed.`;
    default:
      return `${percentage}% risk of readmission`;
  }
}
