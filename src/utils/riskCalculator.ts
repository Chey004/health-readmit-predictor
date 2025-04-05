
import { Patient } from "@/data/sampleData";

// This is a simplified risk calculation model
// In a real-world scenario, this would be based on a trained ML model
export function calculateRiskScore(patientData: Partial<Patient>): number {
  // Base risk starts at 0.1 (10%)
  let riskScore = 0.1;
  
  // Age factor (older patients have higher risk) - improved gradient
  if (patientData.age) {
    if (patientData.age > 85) riskScore += 0.20;
    else if (patientData.age > 75) riskScore += 0.15;
    else if (patientData.age > 65) riskScore += 0.10;
    else if (patientData.age > 55) riskScore += 0.05;
    else if (patientData.age > 45) riskScore += 0.03;
  }
  
  // Previous admissions (strong predictor) - improved weighting
  if (patientData.previousAdmissions !== undefined) {
    // Exponential risk increase for patients with multiple admissions
    riskScore += 0.05 * Math.pow(1.2, patientData.previousAdmissions);
  }
  
  // Length of stay (longer stays indicate more complex cases)
  if (patientData.lengthOfStay) {
    if (patientData.lengthOfStay > 14) riskScore += 0.20;
    else if (patientData.lengthOfStay > 7) riskScore += 0.15;
    else if (patientData.lengthOfStay > 4) riskScore += 0.08;
    else if (patientData.lengthOfStay > 2) riskScore += 0.04;
  }
  
  // Comorbidities - Original conditions
  if (patientData.hasHypertension) riskScore += 0.05;
  if (patientData.hasDiabetes) riskScore += 0.07;
  if (patientData.hasHeartDisease) riskScore += 0.12;
  
  // Additional comorbidities
  if (patientData.hasCOPD) riskScore += 0.09;
  if (patientData.hasAsthma) riskScore += 0.06;
  if (patientData.hasKidneyDisease) riskScore += 0.11;
  if (patientData.hasLiverDisease) riskScore += 0.10;
  if (patientData.hasCancer) riskScore += 0.14;
  if (patientData.hasStroke) riskScore += 0.13;
  
  // Medication burden (polypharmacy) - improved gradient
  if (patientData.medicationCount) {
    if (patientData.medicationCount > 10) riskScore += 0.15;
    else if (patientData.medicationCount > 8) riskScore += 0.10;
    else if (patientData.medicationCount > 5) riskScore += 0.05;
    else if (patientData.medicationCount > 3) riskScore += 0.03;
  }
  
  // Disease-specific indicators - improved sensitivity
  if (patientData.hba1c) {
    if (patientData.hba1c > 9.0) riskScore += 0.12;
    else if (patientData.hba1c > 8.0) riskScore += 0.10;
    else if (patientData.hba1c > 7.0) riskScore += 0.06;
    else if (patientData.hba1c > 6.5) riskScore += 0.03;
  }
  
  if (patientData.egfr) {
    if (patientData.egfr < 30) riskScore += 0.18;
    else if (patientData.egfr < 45) riskScore += 0.13;
    else if (patientData.egfr < 60) riskScore += 0.08;
  }
  
  if (patientData.lvef) {
    if (patientData.lvef < 25) riskScore += 0.20;
    else if (patientData.lvef < 35) riskScore += 0.15;
    else if (patientData.lvef < 40) riskScore += 0.10;
  }
  
  // BMI (both high and low can be risk factors)
  if (patientData.bmi) {
    if (patientData.bmi > 40) riskScore += 0.10;
    else if (patientData.bmi > 35) riskScore += 0.08;
    else if (patientData.bmi > 30) riskScore += 0.05;
    else if (patientData.bmi < 16) riskScore += 0.12;
    else if (patientData.bmi < 18.5) riskScore += 0.07;
  }
  
  // Multiple comorbidities increase risk exponentially
  const comorbidityCount = [
    patientData.hasHypertension, 
    patientData.hasDiabetes, 
    patientData.hasHeartDisease,
    patientData.hasCOPD,
    patientData.hasAsthma,
    patientData.hasKidneyDisease,
    patientData.hasLiverDisease,
    patientData.hasCancer,
    patientData.hasStroke
  ].filter(Boolean).length;
  
  // Add additional risk for multiple comorbidities with improved weighting
  if (comorbidityCount > 3) {
    // More progressive scaling for multiple conditions
    // The more comorbidities, the greater the multiplicative effect
    const multiplicativeFactor = 1.0 + (comorbidityCount - 3) * 0.08;
    riskScore = riskScore * multiplicativeFactor;
  }
  
  // Gender factor (statistical correlation based on research)
  if (patientData.gender === 'Male' && patientData.age && patientData.age > 65) {
    riskScore += 0.03; // Slight increase for elderly males
  }
  
  // Interactions between conditions (synergistic effects)
  // Diabetes + Kidney Disease has worse outcomes than each separately
  if (patientData.hasDiabetes && patientData.hasKidneyDisease) {
    riskScore += 0.05;
  }
  
  // Heart Disease + COPD has worse outcomes
  if (patientData.hasHeartDisease && patientData.hasCOPD) {
    riskScore += 0.06;
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
