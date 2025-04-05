
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
    <Card className={cn("h-full transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:bg-card/80", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-primary-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="relative">{children}</CardContent>
    </Card>
  );
};

export default InfoCard;
