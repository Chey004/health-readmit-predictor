
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

const InfoCard = ({ title, description, className, children }: InfoCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={cn(
        "h-full transition-all duration-300 border border-slate-100 bg-white/80 backdrop-blur-md hover:shadow-lg overflow-hidden",
        className
      )}>
        <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-100">
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">{title}</CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="relative">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InfoCard;
