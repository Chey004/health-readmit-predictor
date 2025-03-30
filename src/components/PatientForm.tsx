
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateRiskScore } from '@/utils/riskCalculator';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.coerce.number().min(18).max(120),
  gender: z.enum(['Male', 'Female', 'Other']),
  diagnosis: z.string().min(2),
  lengthOfStay: z.coerce.number().min(1).max(100),
  previousAdmissions: z.coerce.number().min(0).max(50),
  hasHypertension: z.boolean().default(false),
  hasDiabetes: z.boolean().default(false),
  hasHeartDisease: z.boolean().default(false),
  medicationCount: z.coerce.number().min(0).max(30),
  bmi: z.coerce.number().min(10).max(60).optional(),
  hba1c: z.coerce.number().min(4).max(15).optional(),
  egfr: z.coerce.number().min(5).max(120).optional(),
  lvef: z.coerce.number().min(10).max(80).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PatientFormProps {
  onCalculateRisk: (score: number, patientData: FormData) => void;
}

const PatientForm = ({ onCalculateRisk }: PatientFormProps) => {
  const { toast } = useToast();
  const [selectedDiagnosis, setSelectedDiagnosis] = useState('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 65,
      gender: 'Male',
      diagnosis: '',
      lengthOfStay: 3,
      previousAdmissions: 0,
      hasHypertension: false,
      hasDiabetes: false,
      hasHeartDisease: false,
      medicationCount: 3,
      bmi: 25,
    },
  });

  function onSubmit(data: FormData) {
    try {
      const riskScore = calculateRiskScore(data);
      onCalculateRisk(riskScore, data);
      toast({
        title: "Risk calculated successfully",
        description: "The patient's readmission risk has been calculated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error calculating risk",
        description: "An error occurred while calculating the risk score.",
      });
    }
  }

  const handleDiagnosisChange = (value: string) => {
    setSelectedDiagnosis(value);
    form.setValue('diagnosis', value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Diagnosis</FormLabel>
                <Select
                  onValueChange={handleDiagnosisChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select diagnosis" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Heart Failure">Heart Failure</SelectItem>
                    <SelectItem value="Diabetes Type 1">Diabetes Type 1</SelectItem>
                    <SelectItem value="Diabetes Type 2">Diabetes Type 2</SelectItem>
                    <SelectItem value="COPD">COPD</SelectItem>
                    <SelectItem value="Pneumonia">Pneumonia</SelectItem>
                    <SelectItem value="Stroke">Stroke</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lengthOfStay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length of Stay (days)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="previousAdmissions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Admissions (last 12 months)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="medicationCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Medications</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bmi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>BMI</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {(selectedDiagnosis.includes('Diabetes')) && (
            <FormField
              control={form.control}
              name="hba1c"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HbA1c (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(selectedDiagnosis === 'Heart Failure') && (
            <FormField
              control={form.control}
              name="lvef"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LVEF (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="hasHypertension"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Hypertension</FormLabel>
                  <FormDescription>
                    Patient has hypertension
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasDiabetes"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Diabetes</FormLabel>
                  <FormDescription>
                    Patient has diabetes
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasHeartDisease"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Heart Disease</FormLabel>
                  <FormDescription>
                    Patient has heart disease
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6 bg-medical-600 hover:bg-medical-700">
          Calculate Readmission Risk
        </Button>
      </form>
    </Form>
  );
};

export default PatientForm;
