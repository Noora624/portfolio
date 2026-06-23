import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RoleScrollerProps {
  roles: string[];
}

export default function RoleScroller({ roles }: RoleScrollerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // 3 seconds per role
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="h-10 sm:h-12 flex items-center justify-start overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -22, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-gradient-cyan-purple tracking-wide"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
