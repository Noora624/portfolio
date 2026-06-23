import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  theme?: 'light' | 'dark';
}

export default function TypewriterText({ text, speed = 25, theme = 'dark' }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showProgress, setShowProgress] = useState(true);

  useEffect(() => {
    // Reset typing state when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        
        // Randomly play subtle key typewriter sound at a low frequency to keep it premium and non-annoying
        if (currentIndex % 3 === 0) {
          try {
            sound.playHover();
          } catch (e) {}
        }
      }, speed + (Math.random() * 15 - 5)); // Add minor organic jitter to typing speed
      
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      // Automatically fade out the "AI Generating" tag after some seconds
      const statusTimeout = setTimeout(() => {
        setShowProgress(false);
      }, 3000);
      return () => clearTimeout(statusTimeout);
    }
  }, [currentIndex, text, speed]);

  const handleReplay = () => {
    sound.playClick();
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setShowProgress(true);
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-3 select-none">
      {/* Real-time AI Generation status card */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-[10px] sm:text-xs font-mono font-bold tracking-wider"
          >
            {isComplete ? (
              <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                AI SUMMARY COMPILATION COMPLETE
              </span>
            ) : (
              <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full animate-pulse border ${
                isDark 
                  ? 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20' 
                  : 'text-[#0089a3] bg-cyan-100/60 border-cyan-200'
              }`}>
                <Terminal size={11} className="animate-spin" />
                AI SYNTHESIZER: RUNNING STREAM
              </span>
            )}

            {!isComplete && (
              <span className="text-slate-500 text-[10px]">
                {Math.round((currentIndex / text.length) * 100)}%
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main typewriter text body */}
      <div className="relative group">
        <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-lg text-justify ${
          isDark ? 'text-white/80' : 'text-slate-705 font-medium'
        }`}>
          {displayedText}
          {!isComplete && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="inline-block w-[6px] h-3 ml-0.5 bg-[#00E5FF]"
            />
          )}
        </p>

        {/* Small subtle Replay Trigger on hover */}
        {isComplete && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            animate={{ opacity: 0.4 }}
            onClick={handleReplay}
            className={`absolute -right-2 -bottom-6 p-1 hover:opacity-100 transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono border border-transparent rounded-md px-1.5 ${
              isDark 
                ? 'text-slate-500 hover:text-[#00E5FF] hover:border-[#00E5FF]/20 hover:bg-[#00E5FF]/5' 
                : 'text-slate-500 hover:text-[#0089a3] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/10'
            }`}
            title="Replay generation"
          >
            <RefreshCw size={10} />
            <span>RE-TYPE</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
