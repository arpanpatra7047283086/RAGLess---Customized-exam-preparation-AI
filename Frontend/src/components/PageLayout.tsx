import type { ReactNode } from 'react';
import { GeometricBackground } from './GeometricBackground';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen">
      <GeometricBackground />
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
};
