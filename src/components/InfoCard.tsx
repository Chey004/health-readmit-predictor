
import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const InfoCard = ({ title, description, className, children, icon }: InfoCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={cn(
        "h-full transition-all duration-300 border border-slate-100 bg-white/80 backdrop-blur-md shadow-md overflow-hidden",
        className
      )}>
        <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-full bg-primary/10 text-primary float-animation">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-xl font-semibold gradient-text">{title}</CardTitle>
              {description && (
                <CardDescription className="text-muted-foreground">{description}</CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InfoCard;
