
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from '@/data/sampleData';
import { Badge } from "@/components/ui/badge";
import { getRiskCategory } from '@/utils/riskCalculator';

interface DataTableProps {
  patients: Patient[];
}

const DataTable = ({ patients }: DataTableProps) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableCaption>Recent patient readmission risk assessments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Prev. Admits</TableHead>
            <TableHead>LOS</TableHead>
            <TableHead>Risk Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => {
            const riskCategory = getRiskCategory(patient.riskScore);
            return (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell>{patient.previousAdmissions}</TableCell>
                <TableCell>{patient.lengthOfStay} days</TableCell>
                <TableCell>
                  <Badge className={
                    riskCategory === 'high' ? 'bg-red-500 hover:bg-red-600' : 
                    riskCategory === 'medium' ? 'bg-amber-500 hover:bg-amber-600' : 
                    'bg-green-500 hover:bg-green-600'
                  }>
                    {Math.round(patient.riskScore * 100)}%
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
