
import { Patient } from "@/data/sampleData";

// Advanced risk calculation model with PROMs integration and explainability
export function calculateRiskScore(patientData: Partial<Patient>): { 
  score: number; 
  factors: Array<{ name: string; contribution: number; description: string }>;
} {
  // Base risk starts at 0.1 (10%)
  let riskScore = 0.1;
  
  // Track contribution factors for explainability
  const factors: Array<{ name: string; contribution: number; description: string }> = [];
  
  // Age factor (older patients have higher risk) - improved gradient
  let ageContribution = 0;
  if (patientData.age) {
    if (patientData.age > 85) ageContribution = 0.20;
    else if (patientData.age > 75) ageContribution = 0.15;
    else if (patientData.age > 65) ageContribution = 0.10;
    else if (patientData.age > 55) ageContribution = 0.05;
    else if (patientData.age > 45) ageContribution = 0.03;
    
    if (ageContribution > 0) {
      riskScore += ageContribution;
      factors.push({
        name: "Age",
        contribution: ageContribution,
        description: `Age ${patientData.age} increases risk by ${Math.round(ageContribution * 100)}%`
      });
    }
  }
  
  // Previous admissions (strong predictor) - improved weighting
  let admissionsContribution = 0;
  if (patientData.previousAdmissions !== undefined) {
    // Exponential risk increase for patients with multiple admissions
    admissionsContribution = 0.05 * Math.pow(1.2, patientData.previousAdmissions);
    riskScore += admissionsContribution;
    
    factors.push({
      name: "Previous Admissions",
      contribution: admissionsContribution,
      description: `${patientData.previousAdmissions} previous hospital stays in the last 12 months`
    });
  }
  
  // Length of stay (longer stays indicate more complex cases)
  let losContribution = 0;
  if (patientData.lengthOfStay) {
    if (patientData.lengthOfStay > 14) losContribution = 0.20;
    else if (patientData.lengthOfStay > 7) losContribution = 0.15;
    else if (patientData.lengthOfStay > 4) losContribution = 0.08;
    else if (patientData.lengthOfStay > 2) losContribution = 0.04;
    
    if (losContribution > 0) {
      riskScore += losContribution;
      factors.push({
        name: "Length of Stay",
        contribution: losContribution,
        description: `${patientData.lengthOfStay} day hospital stay indicates higher complexity`
      });
    }
  }
  
  // Comorbidities with interpretable contributions
  const comorbidityFactors: Record<string, { value: boolean | undefined, contribution: number, description: string }> = {
    "Hypertension": { value: patientData.hasHypertension, contribution: 0.05, description: "History of high blood pressure" },
    "Diabetes": { value: patientData.hasDiabetes, contribution: 0.07, description: "Affects blood sugar regulation" },
    "Heart Disease": { value: patientData.hasHeartDisease, contribution: 0.12, description: "Cardiovascular complications" },
    "COPD": { value: patientData.hasCOPD, contribution: 0.09, description: "Chronic respiratory condition" },
    "Asthma": { value: patientData.hasAsthma, contribution: 0.06, description: "Respiratory inflammation condition" },
    "Kidney Disease": { value: patientData.hasKidneyDisease, contribution: 0.11, description: "Affects fluid and waste removal" },
    "Liver Disease": { value: patientData.hasLiverDisease, contribution: 0.10, description: "Impairs detoxification function" },
    "Cancer": { value: patientData.hasCancer, contribution: 0.14, description: "Ongoing or recent treatment" },
    "Stroke": { value: patientData.hasStroke, contribution: 0.13, description: "History of cerebrovascular event" },
  };
  
  // Process comorbidities and add to factors
  let totalComorbidities = 0;
  Object.entries(comorbidityFactors).forEach(([name, data]) => {
    if (data.value) {
      riskScore += data.contribution;
      totalComorbidities++;
      factors.push({
        name,
        contribution: data.contribution,
        description: data.description
      });
    }
  });
  
  // Medication burden (polypharmacy) - improved gradient
  let medicationContribution = 0;
  if (patientData.medicationCount) {
    if (patientData.medicationCount > 10) medicationContribution = 0.15;
    else if (patientData.medicationCount > 8) medicationContribution = 0.10;
    else if (patientData.medicationCount > 5) medicationContribution = 0.05;
    else if (patientData.medicationCount > 3) medicationContribution = 0.03;
    
    if (medicationContribution > 0) {
      riskScore += medicationContribution;
      factors.push({
        name: "Medication Count",
        contribution: medicationContribution,
        description: `${patientData.medicationCount} medications indicate polypharmacy risk`
      });
    }
  }
  
  // Disease-specific indicators - improved sensitivity
  if (patientData.hba1c) {
    let hba1cContribution = 0;
    if (patientData.hba1c > 9.0) hba1cContribution = 0.12;
    else if (patientData.hba1c > 8.0) hba1cContribution = 0.10;
    else if (patientData.hba1c > 7.0) hba1cContribution = 0.06;
    else if (patientData.hba1c > 6.5) hba1cContribution = 0.03;
    
    if (hba1cContribution > 0) {
      riskScore += hba1cContribution;
      factors.push({
        name: "HbA1c",
        contribution: hba1cContribution,
        description: `HbA1c of ${patientData.hba1c}% indicates glycemic control issues`
      });
    }
  }
  
  if (patientData.egfr) {
    let egfrContribution = 0;
    if (patientData.egfr < 30) egfrContribution = 0.18;
    else if (patientData.egfr < 45) egfrContribution = 0.13;
    else if (patientData.egfr < 60) egfrContribution = 0.08;
    
    if (egfrContribution > 0) {
      riskScore += egfrContribution;
      factors.push({
        name: "eGFR",
        contribution: egfrContribution,
        description: `eGFR of ${patientData.egfr} indicates kidney function impairment`
      });
    }
  }
  
  if (patientData.lvef) {
    let lvefContribution = 0;
    if (patientData.lvef < 25) lvefContribution = 0.20;
    else if (patientData.lvef < 35) lvefContribution = 0.15;
    else if (patientData.lvef < 40) lvefContribution = 0.10;
    
    if (lvefContribution > 0) {
      riskScore += lvefContribution;
      factors.push({
        name: "LVEF",
        contribution: lvefContribution,
        description: `LVEF of ${patientData.lvef}% indicates heart pumping efficiency issues`
      });
    }
  }
  
  // BMI (both high and low can be risk factors)
  if (patientData.bmi) {
    let bmiContribution = 0;
    let bmiDescription = "";
    
    if (patientData.bmi > 40) {
      bmiContribution = 0.10;
      bmiDescription = "Class III obesity (BMI > 40)";
    } else if (patientData.bmi > 35) {
      bmiContribution = 0.08;
      bmiDescription = "Class II obesity (BMI 35-40)";
    } else if (patientData.bmi > 30) {
      bmiContribution = 0.05;
      bmiDescription = "Class I obesity (BMI 30-35)";
    } else if (patientData.bmi < 16) {
      bmiContribution = 0.12;
      bmiDescription = "Severe underweight (BMI < 16)";
    } else if (patientData.bmi < 18.5) {
      bmiContribution = 0.07;
      bmiDescription = "Underweight (BMI 16-18.5)";
    }
    
    if (bmiContribution > 0) {
      riskScore += bmiContribution;
      factors.push({
        name: "BMI",
        contribution: bmiContribution,
        description: `${bmiDescription} (BMI: ${patientData.bmi.toFixed(1)})`
      });
    }
  }
  
  // Multiple comorbidities increase risk exponentially
  if (totalComorbidities > 3) {
    // More progressive scaling for multiple conditions
    // The more comorbidities, the greater the multiplicative effect
    const multiplicativeFactor = 1.0 + (totalComorbidities - 3) * 0.08;
    const additionalRisk = (riskScore * multiplicativeFactor) - riskScore;
    riskScore += additionalRisk;
    
    factors.push({
      name: "Multiple Conditions",
      contribution: additionalRisk,
      description: `Having ${totalComorbidities} health conditions creates compounding effects`
    });
  }
  
  // Gender factor (statistical correlation based on research)
  if (patientData.gender === 'Male' && patientData.age && patientData.age > 65) {
    const genderContribution = 0.03;
    riskScore += genderContribution;
    factors.push({
      name: "Gender & Age",
      contribution: genderContribution,
      description: "Elderly males have statistically higher readmission rates"
    });
  }
  
  // Interactions between conditions (synergistic effects)
  // Diabetes + Kidney Disease has worse outcomes than each separately
  if (patientData.hasDiabetes && patientData.hasKidneyDisease) {
    const interactionContribution = 0.05;
    riskScore += interactionContribution;
    factors.push({
      name: "Diabetes-Kidney Interaction",
      contribution: interactionContribution,
      description: "Diabetes and kidney disease create compounding health risks"
    });
  }
  
  // Heart Disease + COPD has worse outcomes
  if (patientData.hasHeartDisease && patientData.hasCOPD) {
    const interactionContribution = 0.06;
    riskScore += interactionContribution;
    factors.push({
      name: "Heart-Lung Interaction",
      contribution: interactionContribution,
      description: "Heart disease and COPD create additional respiratory burden"
    });
  }
  
  // Patient-Reported Outcome Measures (PROMs) - NEW
  if (patientData.selfReportedHealth) {
    let promContribution = 0;
    if (patientData.selfReportedHealth === 'Poor') promContribution = 0.12;
    else if (patientData.selfReportedHealth === 'Fair') promContribution = 0.08;
    else if (patientData.selfReportedHealth === 'Good') promContribution = 0.04;
    
    if (promContribution > 0) {
      riskScore += promContribution;
      factors.push({
        name: "Self-Reported Health",
        contribution: promContribution,
        description: `Patient reports ${patientData.selfReportedHealth.toLowerCase()} health status`
      });
    }
  }
  
  if (patientData.painLevel !== undefined) {
    let painContribution = 0;
    if (patientData.painLevel >= 7) painContribution = 0.10;
    else if (patientData.painLevel >= 4) painContribution = 0.06;
    else if (patientData.painLevel >= 1) painContribution = 0.02;
    
    if (painContribution > 0) {
      riskScore += painContribution;
      factors.push({
        name: "Pain Level",
        contribution: painContribution,
        description: `Pain level ${patientData.painLevel}/10 may complicate recovery`
      });
    }
  }
  
  if (patientData.mobilityScore !== undefined) {
    let mobilityContribution = 0;
    if (patientData.mobilityScore <= 3) mobilityContribution = 0.15;
    else if (patientData.mobilityScore <= 6) mobilityContribution = 0.08;
    else if (patientData.mobilityScore <= 8) mobilityContribution = 0.03;
    
    if (mobilityContribution > 0) {
      riskScore += mobilityContribution;
      factors.push({
        name: "Mobility Score",
        contribution: mobilityContribution,
        description: `Limited mobility (${patientData.mobilityScore}/10) increases complications`
      });
    }
  }
  
  // Social Determinants of Health - NEW
  if (patientData.livesAlone) {
    const socialContribution = 0.08;
    riskScore += socialContribution;
    factors.push({
      name: "Lives Alone",
      contribution: socialContribution,
      description: "Limited social support for post-discharge care"
    });
  }
  
  if (patientData.transportationIssues) {
    const transportContribution = 0.07;
    riskScore += transportContribution;
    factors.push({
      name: "Transportation Issues",
      contribution: transportContribution,
      description: "Difficulty attending follow-up appointments"
    });
  }
  
  // Sort factors by contribution (highest first)
  factors.sort((a, b) => b.contribution - a.contribution);
  
  // Cap the maximum risk at 0.95 (95%)
  return {
    score: Math.min(Math.round(riskScore * 100) / 100, 0.95),
    factors: factors
  };
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

// Enhanced return type for the risk data
export type RiskData = {
  score: number;
  category: "low" | "medium" | "high";
  description: string;
  factors: Array<{ 
    name: string; 
    contribution: number; 
    description: string;
    percentage: number;
  }>;
};

// New function to get comprehensive risk data
export function getDetailedRiskData(patientData: Partial<Patient>): RiskData {
  const { score, factors } = calculateRiskScore(patientData);
  const category = getRiskCategory(score);
  const description = getRiskDescription(score);
  
  // Calculate percentage contribution for each factor
  const totalRisk = score - 0.1; // Subtract base risk
  const factorsWithPercentage = factors.map(factor => ({
    ...factor,
    percentage: Math.round((factor.contribution / totalRisk) * 100)
  }));
  
  return {
    score,
    category,
    description,
    factors: factorsWithPercentage
  };
}
