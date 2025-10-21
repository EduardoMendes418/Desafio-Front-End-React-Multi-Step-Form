import React from 'react';

interface FieldGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}

export const FieldGrid: React.FC<FieldGridProps> = ({ 
  children, 
  columns = 2, 
  gap = 'md' 
}) => {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
  };

  const gridGap = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  const className = `grid ${gridColumns[columns]} ${gridGap[gap]}`;

  return <div className={className}>{children}</div>;
};