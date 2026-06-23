import React from 'react';
import * as Lucide from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size = 20 }: IconProps) {
  // Safe lookup for Lucide icons
  const LucideIcon = (Lucide as any)[name];
  
  if (!LucideIcon) {
    // Return a default fallback code icon if the requested one doesn't exist
    return <Lucide.Code className={className} size={size} />;
  }

  return <LucideIcon className={className} size={size} />;
}
