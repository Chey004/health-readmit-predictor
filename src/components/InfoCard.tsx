
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
  glowColor?: string;
  animate?: boolean;
}

const InfoCard = ({ 
  title, 
  description, 
  className, 
  children, 
  icon,
  glowColor = "rgba(56, 189, 248, 0.35)",
  animate = true
}: InfoCardProps) => {
  return (
    <motion.div
      whileHover={animate ? { y: -5, boxShadow: `0 20px 25px -5px ${glowColor}` } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative", animate ? "transform-gpu" : "")}
    >
      <Card className={cn(
        "h-full transition-all duration-300 border border-slate-100/80 bg-white/90 backdrop-blur-md shadow-md overflow-hidden",
        "hover:border-slate-200 hover:bg-white/95",
        className
      )}>
        {animate && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/30 to-transparent glow-animation pointer-events-none" />
        )}
        <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-100/80">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-full bg-primary/10 text-primary pulse-subtle">
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
      {animate && (
        <div 
          className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-indigo-500/20 rounded-lg blur-md opacity-30 -z-10 group-hover:opacity-60 transition-opacity" 
          style={{ 
            background: `linear-gradient(60deg, transparent, ${glowColor}, transparent)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}
        />
      )}
    </motion.div>
  );
};

export default InfoCard;
