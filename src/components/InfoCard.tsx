
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const InfoCard = ({ title, description, className, children }: InfoCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default InfoCard;
