import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  duration?: number;
  theme?: 'light' | 'dark';
}

export default function AnimatedCounter({ target, suffix, duration = 1800, theme = 'dark' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Premium cubic-out easing for custom deceleration feel
      const easedRatio = 1 - Math.pow(1 - progressRatio, 3);
      
      setCount(Math.floor(easedRatio * target));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, target, duration]);

  const isCompleted = count === target;
  const isDark = theme === 'dark';

  return (
    <span 
      ref={elementRef} 
      className="font-display font-black text-3xl md:text-4xl tracking-tight block relative select-none"
    >
      {/* Dynamic gradient text based on theme to maintain readability */}
      <span 
        className={`bg-gradient-to-r bg-clip-text text-transparent transition-all duration-300 ${
          isDark 
            ? 'from-white via-purple-300 to-[#7B61FF]' 
            : 'from-slate-900 via-purple-600 to-[#5C3AFF]'
        } ${
          !isCompleted ? 'animate-pulse drop-shadow-[0_0_15px_rgba(123,97,255,0.7)] text-[#7B61FF]' : 'drop-shadow-[0_0_6px_rgba(123,97,255,0.2)]'
        }`}
      >
        {count}
      </span>
      
      {/* Suffix character in high-intensity deep purple neon */}
      <span className={`font-black ml-0.5 tracking-tighter drop-shadow-[0_0_8px_rgba(123,97,255,0.6)] ${isDark ? 'text-[#7B61FF]' : 'text-purple-600'}`}>
        {suffix}
      </span>
    </span>
  );
}
